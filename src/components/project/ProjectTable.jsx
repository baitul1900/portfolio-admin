/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Space, Table, Modal, ConfigProvider } from "antd";
import projectStore from "../../store/projectStore";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import ProjectView from "./ProjectView";
import toast, { Toaster } from "react-hot-toast";
import ProjectCreate from "./ProjectCreate";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";

const ProjectTable = () => {
  const { project, projectRequest, projectDeleteByID, searchKeyword } =
    projectStore((state) => state);

  useEffect(() => {
    projectRequest();
  }, []);

  const handleSearch = async (value) => {
    if (value) {
      await searchKeyword(value);
    } else {
      projectRequest();
    }
  };

  //   modal function
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Columns configuration
  const columns = [
    {
      title: "Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tech use",
      dataIndex: "technologyUse",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Short Title",
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
      dataIndex: "Des",
      key: "Des",
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
          <Link className="text-light" to={`/project-update/${record._id}`}>
            <EditOutlined />
          </Link>

          <DeleteOutlined onClick={() => handleDelete(record._id)} />
          <EyeOutlined onClick={() => handleViewClick(record)} />
        </Space>
      ),
    },
  ];

  const handleViewClick = (record) => {
    setSelectedProject(record);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await projectDeleteByID(id);
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="row d-flex justify-content-between">
        <div className="col-4">
          <h1>Project</h1>
        </div>

        <div className="col-2 d-flex justify-content-end text-end ">
          <Search
            placeholder="Search projects"
            className="w-70"
            onSearch={handleSearch}
            enterButton
          />
        </div>

        <div className="col-2 text-end">
          <Link
            className="btn btn-primary mb-4"
            onClick={() => setOpenTwo(true)}
          >
            Add Project
          </Link>
        </div>
      </div>

      {/* table here */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellFontSizeMD: 16,
              borderColor: "#f0",
            },
            // Pagination: {},
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={project}
          size="small"
          rowClassName="no-hover"
          bordered = {false} 
       
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["10", "20", "50"],
            showQuickJumper: true,
            total: project.length,
            showTotal: (total) => `Total ${total} items`,
            position: ["bottomRight"],
            style: {
              marginTop: "26px",
            },
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
        {selectedProject && <ProjectView project={selectedProject} />}
      </Modal>
      {/* modal here for view product end*/}

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
        <ProjectCreate />
      </Modal>
    </>
  );
};

export default ProjectTable;
