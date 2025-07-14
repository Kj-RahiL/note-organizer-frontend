import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Grid, Button, Avatar, Space, Input } from "antd";
import logo from "/logo.png";
import { MdOutlineArchive } from "react-icons/md";
import { GrDocumentNotes } from "react-icons/gr";
import { RiDeleteBinLine, RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import user from "../../assets/usersImage/user-6.png";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const location = useLocation();
  const screens = useBreakpoint();

  const isMobile = !screens.lg;
  const sidebarCollapsed = isMobile ? mobileCollapsed : collapsed;

  useEffect(() => {
    if (isMobile) {
      setMobileCollapsed(true); // Start collapsed on mobile
    } else {
      setCollapsed(false); // Start expanded on desktop
    }
  }, [isMobile]);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      {/* Header */}
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
          padding: isMobile ? "0 12px" : "0 20px",
          height: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
          <img
            src={logo}
            width={isMobile ? 120 : 150}
            alt="Logo"
            style={{ minWidth: isMobile ? 120 : 150 }}
          />

          {!isMobile && (
            <Button
              type="text"
              icon={collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "20px" }}
            />
          )}
        </div>

        <Space size="middle" align="center">
          {!isMobile && (
            <Input
              placeholder="Search"
              style={{
                width: "200px",
                height: "32px",
                borderRadius: "4px",
                border: "1px solid #DFDFDF",
              }}
            />
          )}

          <Avatar
            size={isMobile ? 28 : 32}
            src={user}
            style={{ cursor: "pointer" }}
          />

          {isMobile && (
            <Button
              type="text"
              icon={mobileCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
              onClick={() => setMobileCollapsed(!mobileCollapsed)}
              style={{ fontSize: "20px" }}
            />
          )}
        </Space>
      </Header>

      {/* Sidebar and Content */}
      <Layout style={{ marginTop: 64 }}>
        <Sider
          width={isMobile ? 220 : 300}
          collapsedWidth={isMobile ? 70 : 80}
          collapsible
          collapsed={sidebarCollapsed}
          trigger={null}
          style={{
            background: "#ffff",
            position: "fixed",
            height: "calc(100vh - 64px)",
            left: 0,
            top: 64,
            padding: "16px",
            borderRight: "1px solid #DFDFDF",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
          }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              inlineCollapsed={sidebarCollapsed}
              style={{
                borderRight: 0,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <Menu.Item key="/" icon={<GrDocumentNotes size={24} />}>
                <Link to="/">{sidebarCollapsed ? null : "Notes"}</Link>
              </Menu.Item>
              <Menu.Item key="/archive" icon={<MdOutlineArchive size={24} />}>
                <Link to="/archive">{sidebarCollapsed ? null : "Archive"}</Link>
              </Menu.Item>
              <Menu.Item key="/bin" icon={<RiDeleteBinLine size={24} />}>
                <Link to="/bin">{sidebarCollapsed ? null : "Bin"}</Link>
              </Menu.Item>
            </Menu>
          </div>

          <div style={{ padding: "16px", marginTop: "auto" }}>
            <Button
              type="primary"
              size="large"
              icon={<IoLogOutOutline size={20} />}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
                gap: sidebarCollapsed ? 0 : "8px",
                backgroundColor: "#F1F5F9",
                color: "#000",
              }}
            >
              {sidebarCollapsed ? null : "Log Out"}
            </Button>
          </div>
        </Sider>

        <Layout
          style={{
            marginLeft: isMobile
              ? (mobileCollapsed ? 0 : 250)
              : (collapsed ? 80 : 300),
            transition: "margin-left 0.3s ease",
          }}
        >
          <Content
            className={isMobile ? "p-3" : "p-6"}
            style={{
              margin: 0,
              minHeight: "calc(100vh - 64px)",
              background: "#F1F5F9",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* Mobile overlay */}
      {isMobile && !mobileCollapsed && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 210,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
          onClick={() => setMobileCollapsed(true)}
        />
      )}
    </Layout>
  );
};

export default App;



// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { Layout, Menu, Grid, Button, Avatar, Space, Input } from "antd";
// import logo from "/logo.png";
// import { MdOutlineArchive } from "react-icons/md";
// import { GrDocumentNotes } from "react-icons/gr";
// import { RiDeleteBinLine, RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
// import { IoLogOutOutline } from "react-icons/io5";
// import user from "../../assets/usersImage/user-6.png";

// const { Header, Content, Sider } = Layout;
// const { useBreakpoint } = Grid;

// const App: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileCollapsed, setMobileCollapsed] = useState(true);
//   const location = useLocation();
//   const screens = useBreakpoint();

//   const isMobile = !screens.lg;
//   const sidebarCollapsed = isMobile ? mobileCollapsed : collapsed;

//   useEffect(() => {
//     if (isMobile) {
//       setMobileCollapsed(true); // Start collapsed on mobile
//     } else {
//       setCollapsed(false); // Start expanded on desktop
//     }
//   }, [isMobile]);

//   return (
//     <Layout style={{ height: "100vh", overflow: "hidden" }}>
//       {/* Header */}
//       <Header
//         className="!bg-white"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           position: "fixed",
//           width: "100%",
//           zIndex: 1000,
//           borderBottom: "1px solid #DFDFDF",
//           padding: isMobile ? "0 12px" : "0 20px",
//           height: "64px",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16 }}>
//           <img
//             src={logo}
//             width={isMobile ? 120 : 150}
//             alt="Logo"
//             style={{ minWidth: isMobile ? 120 : 150 }}
//           />

//           {!isMobile && (
//             <Button
//               type="text"
//               icon={collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
//               onClick={() => setCollapsed(!collapsed)}
//               style={{ fontSize: "20px" }}
//             />
//           )}
//         </div>

//         <Space size="middle" align="center">
//           {!isMobile && (
//             <Input
//               placeholder="Search"
//               style={{
//                 width: "200px",
//                 height: "32px",
//                 borderRadius: "4px",
//                 border: "1px solid #DFDFDF",
//               }}
//             />
//           )}

//           <Avatar
//             size={isMobile ? 28 : 32}
//             src={user}
//             style={{ cursor: "pointer" }}
//           />

//           {isMobile && (
//             <Button
//               type="text"
//               icon={mobileCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
//               onClick={() => setMobileCollapsed(!mobileCollapsed)}
//               style={{ fontSize: "20px" }}
//             />
//           )}
//         </Space>
//       </Header>

//       {/* Sidebar and Content */}
//       <Layout style={{ marginTop: 64 }}>
//         <Sider
//           width={isMobile ? 250 : 300}
//           collapsedWidth={isMobile ? 80 : 80}
//           collapsible
//           collapsed={sidebarCollapsed}
//           trigger={null}
//           style={{
//             background: "#ffff",
//             position: "fixed",
//             height: "calc(100vh - 64px)",
//             left: 0,
//             top: 64,
//             padding: "16px",
//             borderRight: "1px solid #DFDFDF",
//             display: "flex",
//             flexDirection: "column",
//             zIndex: 999,
//           }}
//         >
//           <div style={{ flexGrow: 1, overflowY: "auto" }}>
//             <Menu
//               mode="inline"
//               selectedKeys={[location.pathname]}
//               inlineCollapsed={sidebarCollapsed}
//               style={{
//                 borderRight: 0,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "6px",
//               }}
//             >
//               <Menu.Item key="/" icon={<GrDocumentNotes size={24} />}>
//                 <Link to="/">{sidebarCollapsed ? null : "Notes"}</Link>
//               </Menu.Item>
//               <Menu.Item key="/archive" icon={<MdOutlineArchive size={24} />}>
//                 <Link to="/archive">{sidebarCollapsed ? null : "Archive"}</Link>
//               </Menu.Item>
//               <Menu.Item key="/bin" icon={<RiDeleteBinLine size={24} />}>
//                 <Link to="/bin">{sidebarCollapsed ? null : "Bin"}</Link>
//               </Menu.Item>
//             </Menu>
//           </div>

//           <div style={{ padding: "16px", marginTop: "auto" }}>
//             <Button
//               type="primary"
//               size="large"
//               icon={<IoLogOutOutline size={20} />}
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: sidebarCollapsed ? "center" : "flex-start",
//                 gap: sidebarCollapsed ? 0 : "8px",
//                 backgroundColor: "#F1F5F9",
//                 color: "#000",
//               }}
//             >
//               {sidebarCollapsed ? null : "Log Out"}
//             </Button>
//           </div>
//         </Sider>

//         <Layout
//           style={{
//             marginLeft: isMobile
//               ? (mobileCollapsed ? 0 : 250)
//               : (collapsed ? 80 : 300),
//             transition: "margin-left 0.3s ease",
//           }}
//         >
//           <Content
//             className={isMobile ? "p-3" : "p-6"}
//             style={{
//               margin: 0,
//               minHeight: "calc(100vh - 64px)",
//               background: "#F1F5F9",
//               overflowY: "auto",
//             }}
//           >
//             <Outlet />
//           </Content>
//         </Layout>
//       </Layout>

//       {/* Mobile overlay */}
//       {isMobile && !mobileCollapsed && (
//         <div
//           style={{
//             position: "fixed",
//             top: 64,
//             left: 250,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 998,
//           }}
//           onClick={() => setMobileCollapsed(true)}
//         />
//       )}
//     </Layout>
//   );
// };

// export default App;