
import { format } from 'date-fns';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <motion.ul variants={container} initial="hidden" animate="show">
      {props.posts.map((elt) => elt.title != "Side Projects and Other Niceties" && (
        <motion.li
          key={elt.slug}
          variants={item}
          whileHover={{ x: 4 }}
          className="mb-3 flex justify-between"
        >
          <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
            <h2>{elt.title}</h2>
          </Link>

          <div className="text-right">
            {format(new Date(elt.modified_date), 'LLL d, yyyy')}
          </div>
        </motion.li>
      ))}
    </motion.ul>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { BlogGallery };
