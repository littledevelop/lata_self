import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../common.css';
import { Menu, Row, Col, Drawer, Button } from 'antd';
import { FaHtml5 } from 'react-icons/fa';
import { LaptopOutlined, UploadOutlined, FileOutlined, MenuOutlined } from '@ant-design/icons';
const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = [
    { key: '1', label: 'Home', icon: <FaHtml5 /> },
    { key: '2', label: 'About', icon: <LaptopOutlined /> },
    { key: '3', label: 'Projects', icon: <UploadOutlined /> },
    { key: '4', label: 'Contact', icon: <FileOutlined /> },
    { key: '5', label: 'Blog', icon: <FileOutlined /> },
  ];

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <nav className="navbar">
      <Row
        justify="space-between"
        align="middle"
          >
        {/* Brand Section */}
        <Col xs={18} sm={18} md={12} lg={12}>
          <div className="navbar-brand" style={{ color: 'white', fontSize: '24px' }}>
            <Link to="/home" style={{ color: 'white', textDecoration: 'none' , fontWeight: 'bold', fontSize: '24px',fontFamily:'Arial, sans-serif'}}>  
              <img src="/images/logo.png" alt="Logo" className="logo-image" />
             {/* &nbsp; Lata Chapadia */}
            </Link>
          </div>
        </Col>

        {/* Mobile Menu Button */}
        <Col xs={6} sm={6} md={0} lg={0} style={{ textAlign: 'right' }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />}
            onClick={showDrawer}
          />
        </Col>

        {/* Desktop Menu */}
        <Col xs={0} sm={0} md={12} lg={12} style={{ textAlign: 'right' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={`/${item.label.toLowerCase()}`}>{item.label}</Link>,
            }))}
          />
        </Col>
      </Row>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <Menu
          theme="light"
          mode="vertical"
          defaultSelectedKeys={['1']}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={`/${item.label.toLowerCase()}`}>{item.label}</Link>,
          }))}
        />
      </Drawer>
    </nav>
  );
};

export default Navbar;