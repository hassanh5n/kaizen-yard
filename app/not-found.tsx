import Link from "next/link";

export default function NotFound() {
  return (
    <section className="phead">
      <div className="wrap">
        <h1>That page has driven off</h1>
        <p>The car may have sold, or the link is out of date.</p>
        <Link className="btn btn--gold" href="/inventory/">See cars in stock</Link>
      </div>
    </section>
  );
}
