import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Grid, Button } from "antd";
import logo from "/logo.png";
import {  MdOutlineArchive } from "react-icons/md";
import { GrDocumentNotes } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();

  // Automatically hide sidebar on small screens
  useEffect(() => {
    if (!screens.lg) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Header (Fixed) */}
      <Header
        className="!bg-white"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          borderBottom: "1px solid #DFDFDF",
          padding: "0 20px",
        }}
      >
        <img src={logo} width={150} alt="Logo" />
      </Header>

      {/* Sidebar & Content Layout */}
      <Layout style={{ marginTop: 64 }}>
        {/* Sidebar (Hidden on small screens) */}
        {!collapsed && (
          <Sider
            width={300}
            style={{
              background: "#ffff",
              position: "fixed",
              height: "100%",
              left: 0,
              top: 64,
              padding: "16px",
              borderRight: "1px solid #DFDFDF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Sidebar Menu */}
            <div className="" style={{ flexGrow: 1, overflowY: "auto" }}>
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{
                  borderRight: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Menu.Item key="/" icon={<GrDocumentNotes size={24} />}>
                  <Link to="/">Notes</Link>
                </Menu.Item>
                <Menu.Item
                  key="/archive"
                  icon={<MdOutlineArchive size={24} />}
                >
                  <Link to="/archive">Archive</Link>
                </Menu.Item>
                <Menu.Item key="/bn" icon={<RiDeleteBinLine size={24} />}>
                  <Link to="/bin">Bin</Link>
                </Menu.Item>
                
              </Menu>
            </div>

            {/* Logout Button in Sidebar Footer */}
            <div style={{ padding: "16px", marginTop: "auto", height: "100%" }}>
              <Button
                className="!text-icon-color"
                type="primary"
                size="large"
                icon={<IoLogOutOutline size={20} />}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "320px",
                  backgroundColor: "#F1F5F9",
                }}
              >
                Log Out
              </Button>
            </div>
          </Sider>
        )}

        {/* Main Content (Scrollable) */}
        <Layout
          style={{
            marginLeft: collapsed ? 0 : 300,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Content
            className="lg:p-6"
            style={{
              margin: 0,
              minHeight: "calc(100vh - 64px)",
              background: "#F1F5F9",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
