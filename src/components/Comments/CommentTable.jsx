import { useEffect } from "react";
import commentStore from "../../store/commentStore";
import { ConfigProvider, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const CommentTable = () => {
  const { comment, commentRquest, toggleApproval, commentDeleteByID } = commentStore(
    (state) => state
  );

  useEffect(() => {
    commentRquest();
  }, [comment]);

  const handleToggleApproval = (id) => {
    toggleApproval(id);
  };

  // table items here
  const columns = [
    {
      title: "Author Name",
      dataIndex: "author",
      key: "author",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Content of Comment",
      dataIndex: "content",
      key: "content",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "approved",
      key: "approved",
      render: (approved, record) => (
        <Link
          className="btn btn-secondary py-2"
          onClick={() => handleToggleApproval(record._id)}
        >
          {approved ? "Approved" : "Not Approved"}
        </Link>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "des",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="large">
            <DeleteOutlined onClick={() => handleDelete(record._id)} />
          </Space>
        ),
      },
  ];
  // table items here end


  const handleDelete = async (id) => {
    try {
      await commentDeleteByID(id);
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <>

<Toaster position="top-center" reverseOrder={false} />
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
          dataSource={comment}
          size="middle"
          bordered
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "50"],
            showQuickJumper: true,
            total: comment.length,
            showTotal: (total) => `Total ${total} items`,
            position: ["bottomCenter"],
          }}
        />
      </ConfigProvider>
      {/* modal here for view product */}
    </>
  );
};

export default CommentTable;
