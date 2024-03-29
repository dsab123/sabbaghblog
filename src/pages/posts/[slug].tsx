
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getAllPosts, getPostBySlug } from '../../utils/Content';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypePrism from '@mapbox/rehype-prism';

type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  tags?: string;
  image?: string;
  content: MDXRemoteSerializeResult;
};

const filterOutAttributesIfProjectsPage = (title: string) => {
  if (title === "Side Projects and Other Niceties") {
    return false;
  }

  return true;
}

const DisplayPost = (props: IPostProps) => (
  <Main
    meta={
      <Meta
        title={props.title}
        description={props.description}
        post={{
          image: props.image ?? '',
          date: props.date,
          modified_date: props.modified_date,
        }}
      />
    }
  >
    <h1 className="text-center font-bold text-3xl text-gray-900">
      {props.title}
    </h1>
    <div className="text-center text-sm mb-3">
      {filterOutAttributesIfProjectsPage(props.title) && format(new Date(props.date), 'LLLL d, yyyy')}
      {filterOutAttributesIfProjectsPage(props.title) && props.modified_date !== props.date ? ", updated " + format(new Date(props.modified_date), 'LLLL d, yyyy') : '' }
    </div>
    <div className="text-center text-sm mb-6">
      {filterOutAttributesIfProjectsPage(props.title) && <p>tagged: {props.tags}</p>}
    </div>

    <div className="prose">
      <MDXRemote {...props?.content}></MDXRemote>
    </div>

  </Main>
);

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    'title',
    'description',
    'date',
    'modified_date',
    'tags',
    'image',
    'content',
    'slug',
  ]);


  const content = await serialize(post.content || '', {
    mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypePrism],
    format: 'mdx',
  },});

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date,
      tags: post.tags,
      image: post.image,
      content,
    },
  };
};

export default DisplayPost;
