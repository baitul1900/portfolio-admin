import React, { useEffect, useState } from "react";
import { Space, Table, Modal } from "antd";
import Test from "../../Layout/Test";
import projectStore from "../../store/projectStore";
import {
  EditOutlined,
  ReadOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const ProjectTable = () => {
  const { project, projectRequest } = projectStore((state) => state);

  useEffect(() => {
    projectRequest();
  }, []);

  //   modal function
  const [open, setOpen] = useState(false);

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
          <DeleteOutlined />
          <EyeOutlined onClick={() => setOpen(true)} />
        </Space>
      ),
    },
  ];

  return (
    <Test>
      <h2>Projects</h2>
      <Table columns={columns} dataSource={project} />

      {/* modal here for view product */}
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        
      </Modal>
    </Test>
  );
};

export default ProjectTable;
