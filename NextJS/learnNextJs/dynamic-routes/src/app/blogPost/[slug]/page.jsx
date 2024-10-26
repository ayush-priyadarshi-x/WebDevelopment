function page({ params }) {
  const slugs = ["python", "js", "c++", "c#"];
  const slug = params.slug;
  if (slugs.includes(slug)) {
    return <div>Page name is : {slug}</div>;
  } else {
    return <div>Page not found</div>;
  }
}

export default page;
