import { useEffect, useState } from "react";
import { Space, Table, Modal } from "antd";
import Test from "../../Layout/Test";
import projectStore from "../../store/projectStore";
import {
  EditOutlined,
  ReadOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ProjectView from "./ProjectView";
import toast, { Toaster } from "react-hot-toast";

const ProjectTable = () => {
  const { project, projectRequest, projectDeleteByID } = projectStore(
    (state) => state
  );

  useEffect(() => {
    projectRequest();
  }, [project,projectRequest]);

  //   modal function
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined />
          <ReadOutlined />
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
    <Test>
      <Toaster position="top-center" reverseOrder={false} />


      <h2>Projects</h2>
      <Table columns={columns} dataSource={project} />

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
    </Test>
  );
};

export default ProjectTable;
