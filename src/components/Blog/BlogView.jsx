/* eslint-disable react/prop-types */

const BlogView = (props) => {
  const { blog } = props;

  const createdAt = new Date(blog["createdAt"]);
  const date = createdAt.toDateString();
  return (
    <div className="card">
      {/* blog image here */}
      <img src={blog["image"]} className="img-fluid" alt="image" />

      {/* blog body here */}
      <div className="card-body">
        <h5 className="card-title">{blog["title"]}</h5>
        <p className="card-text">{blog["shortDes"]}</p>
        <div dangerouslySetInnerHTML={{ __html: blog["des"] }}></div>
        <p className="card-text">
          <small className="text-muted">Author: {blog["author"]}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Created at: {date}</small>
        </p>
      </div>
    </div>
  );
};

export default BlogView;
