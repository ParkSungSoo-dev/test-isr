import Link from 'next/link'
import axios from 'axios'
import {Book} from '../../model/common'
import {now} from '../../utils/DateUtil'

interface BooksProps {
  books?: Book[];
}

const Books = ({ books }: BooksProps) => {
  return (
    <>
      {books?.map(({ id, title, description }) => (
        <Link href={`/books/${id}`} key={id}>
          <div style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid black" }}>
            <span style={{ marginRight: "10px" }}>{title}</span>
            <span>{description}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await axios.get("http://localhost:9001/books");
    console.log(`[${now()}] getStaticProps, data`, data);
    return {
      props: { books: data },
      revalidate: 5, // seconds
    };
  } catch (err) {
    return {
      notFound: true,
      revalidate: 5, // seconds
    };
  }
}

export default Books;
