import Link from 'next/link'

const NotFound = () => {
  return (
    <>
      <h1>Not found 404!</h1>
        <div>
          <Link href="/">Go back to Home</Link>
        </div>
    </>
  );
}

export default NotFound;