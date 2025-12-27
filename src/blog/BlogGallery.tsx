
import { format } from 'date-fns';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <ul>
      {props.posts.map((elt) => elt.title != "Side Projects and Other Niceties" && (
        <li key={elt.slug} className="mb-3 flex justify-between">
          <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
            <h2>{elt.title}</h2>
          </Link>

          <div className="text-right">
            {format(new Date(elt.modified_date), 'LLL d, yyyy')}
          </div>
        </li>
      ))}
    </ul>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { BlogGallery };
