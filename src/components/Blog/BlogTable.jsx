import { useEffect, useState } from "react";
import { Space, Table, Modal, ConfigProvider } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import blogStore from "../../store/blogStore";
import BlogView from "./BlogView";
import BlogCreate from "./BlogCreate";

const BlogTable = () => {
  const { blogList, blogRequest } = blogStore((state) => state);
  const [selectedBlog, setSeletedBlog] = useState(null);
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);

  useEffect(() => {
    blogRequest();
  }, [blogList]);

  // table items here
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Short Description",
      dataIndex: "shortDes",
      key: "shortDes",
      render: (text) => {
        const truncatedText =
          text.length > 20 ? text.substring(0, 20) + "..." : text;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: "Des",
      dataIndex: "des",
      key: "des",
      render: (text) => {
        const truncatedText =
          text.length > 20 ? text.substring(0, 20) + "..." : text;
        return <span > <div dangerouslySetInnerHTML={{ __html: truncatedText }}></div></span>;
      },
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "des",
      render: (text) => {
        const truncatedText =
          text.length > 20 ? text.substring(0, 20) + "..." : text;
        return <span>{truncatedText}</span>;
      },
    },
    {
      title: "Image Link",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          className="img-fluid"
          alt="image"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "100px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link className="text-dark" to={`/blog-updated/${record._id}`}>
            <EditOutlined />
          </Link>

          {/* <DeleteOutlined onClick={() => handleDelete(record._id)} /> */}
          <EyeOutlined onClick={() => handleView(record)} />
        </Space>
      ),
    },
  ];
  // table items here end

  // view blog function here
  const handleView = (record) => {
    setSeletedBlog(record);
    setOpen(true);
  };

  return (
    <>
      <div className="row d-flex justify-content-between">
        <div className="col-8">
          <h1>Blog</h1>
        </div>

        <div className="col-3 text-end "></div>

        <div className="col-1 text-end">
          <Link
            className="btn btn-success mb-4"
            onClick={() => setOpenTwo(true)}
          >
            Add Blog
          </Link>
        </div>
      </div>

      {/* table here */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellFontSizeMD: 16,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={blogList}
          size="middle"
          bordered
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "50"],
            showQuickJumper: true,
            total: blogList.length,
            showTotal: (total) => `Total ${total} items`,
            position: ["bottomCenter"],
          }}
        />
      </ConfigProvider>
      {/* modal here for view product */}

      <Modal
        footer={null}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {selectedBlog && <BlogView blog={selectedBlog} />}
      </Modal>
      {/* modal here for view product end*/}

      {/* project create modal */}
      <Modal
        footer={null}
        top
        open={openTwo}
        onOk={() => setOpenTwo(false)}
        onCancel={() => setOpenTwo(false)}
        width={1000}
        height={600}
        className=" mb-5"
      >
        <BlogCreate />
      </Modal>
      {/* project create modal end */}
    </>
  );
};

export default BlogTable;
