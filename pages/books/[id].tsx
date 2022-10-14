import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'
import {GetStaticPaths, GetStaticProps} from 'next'
import {Book} from '../../model/common'
import {now} from '../../utils/DateUtil'

interface GetBookResponse{
  book: Book;
}

interface IdParams extends ParsedUrlQuery {
  id: string;
}

interface BookProps {
  book: Book;
}
const Book = ({ book: { id, title, description } }: BookProps) => {
  return (
    <>
      <div key={id}>
        <span style={{ marginRight: "10px" }}>{title}</span>
        <span>{description}</span>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get("http://localhost:9001/books");
  console.log(`[${now()}] getStaticPaths, data`, data);
  const paths = (data as Book[]).filter(({id}) => id < 4).map(({ id }) => ({ params: { id: String(id) } }));
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    console.log(`[${now()}] getStaticProps, context`, context);
    const { id } = context.params as IdParams;
    const { data } = await axios.get<GetBookResponse>(`http://localhost:9001/books/${id}`);
    console.log(`[${now()}] getStaticProps, data`, data);
    return {
      props: { book: data },
      revalidate: 5, // seconds
    };
  } catch (err) {
    return {
      notFound: true,
      revalidate: 5, // seconds
    };
  }
};

export default Book;
