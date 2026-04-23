import { GetServerSideProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { getAllPosts } from '../utils/Content';
import { convertTo2D } from '../utils/Pagination';

type IPageUrl = {
  page: string;
};

const PaginatePosts = (props: IBlogGalleryProps) => (
  <Main meta={<Meta title="" description="" />}>
    <BlogGallery posts={props.posts} pagination={props.pagination} />
  </Main>
);

export const getServerSideProps: GetServerSideProps<
  IBlogGalleryProps,
  IPageUrl
> = async ({ params }) => {
  const pageParam = params?.page ?? '';

  if (!/^page\d+$/.test(pageParam)) {
    return { notFound: true };
  }

  const posts = getAllPosts(['title', 'modified_date', 'date', 'slug', 'tags']);
  const pages = convertTo2D(posts, AppConfig.pagination_size);

  const currentPage = Number(pageParam.replace('page', ''));
  const currentInd = currentPage - 1;

  if (currentPage < 2 || currentInd >= pages.length) {
    return { notFound: true };
  }

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `page${currentPage + 1}`;
  }

  if (currentPage === 2) {
    pagination.previous = '/';
  } else {
    pagination.previous = `page${currentPage - 1}`;
  }

  return {
    props: {
      posts: pages[currentInd]!,
      pagination,
    },
  };
};

export default PaginatePosts;
