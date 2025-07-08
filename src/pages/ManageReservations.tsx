import React, { useState, useEffect } from 'react';
import './BatchFolio.css';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import { Tabs, Input, Button, Table, Pagination, Tooltip, Drawer, Select, DatePicker, Form, Modal, Dropdown, Checkbox, Menu, Switch } from 'antd';
import { SearchOutlined, InfoCircleFilled } from '@ant-design/icons';
import { ReactComponent as FunnelIcon } from '../assets/Icons/FunnelIcon.svg';
import { ReactComponent as CustomColumnIcon } from '../assets/Icons/custom_column.svg';
import { ReactComponent as CancelModalIcon } from '../assets/Icons/cancelmodal.svg';
import { ReactComponent as CircleInfoIcon } from '../assets/Icons/circle-info.svg';
import InfoIcon from '../assets/Icons/info.svg';
import ExportIcon from '../assets/Icons/export.svg';
import DragIcon from '../assets/Icons/drag.svg';
import ActionMenuIcon from '../assets/Icons/actionmenu.svg';
import LoyaltyProgramIcon from '../assets/Icons/loyaltyprogram.svg';
import EraserIcon from '../assets/Icons/eraser.svg';
import UsersIcon from '../assets/Icons/users.svg';
import ColumnsIcon from '../assets/Icons/ColumnsIcon.svg';
import FilterIcon from '../assets/Icons/FilterIcon.svg';
import GroupIcon from '../assets/Icons/GroupIcon.svg';
import InHouseIcon from '../assets/Icons/in-house.svg';
import CancelledIcon from '../assets/Icons/Cancelled.svg';
import NoShowIcon from '../assets/Icons/no-show.svg';
import CheckedOutIcon from '../assets/Icons/checked-out.svg';
import UnconfirmedIcon from '../assets/Icons/unconfirmed.svg';
import ConfirmedIcon from '../assets/Icons/confirmed.svg';
import TransferOutIcon from '../assets/Icons/transfer out.svg';
import TagInhouse from '../assets/tags/TagInhouse.svg';
import TagCancelled from '../assets/tags/TagCancelled.svg';
import TagNoShow from '../assets/tags/TagNo-Show.svg';
import TagCheckedout from '../assets/tags/TagCheckedout.svg';
import TagUnconfirmed from '../assets/tags/TagUnconfirmed.svg';
import TagConfirmed from '../assets/tags/TagConfirmed.svg';
import TagTransferOut from '../assets/tags/TagTransfer Out.svg';
import NoDataSVG from '../assets/No Data/nodataimage.svg';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Tooltip as AntdTooltip } from 'antd';
import TagConfirmedIcon from '../assets/tags/TagConfirmed.svg';
import TagUnconfirmedIcon from '../assets/tags/TagUnconfirmed.svg';
import PrepaidIcon from '../assets/Icons/prepaid.svg';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const iconButtonStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  minWidth: 40,
  minHeight: 40,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box' as 'border-box',
  borderRadius: 8,
  background: '#fff',
  border: '1px solid #E0E0E0',
  boxShadow: '0 1px 2px 0 rgba(16,30,115,0.03)',
};

const iconStyle: React.CSSProperties = {
  width: 24,
  height: 24,
  color: 'rgba(0,0,0,0.88)',
  display: 'block',
};

// Add new styles for active buttons
const activeButtonStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  minWidth: 40,
  minHeight: 40,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box' as 'border-box',
  borderRadius: 8,
  background: '#fff',
  border: '2px solid #3E4BE0', // blue border
  boxShadow: '0 2px 8px 0 rgba(62,75,224,0.08)',
};
const activeIconStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  color: '#3E4BE0',
  display: 'block',
};

// Table columns and data for Manage Reservations
const columns = [
  {
    title: '',
    dataIndex: 'checkbox',
    key: 'checkbox',
    width: 48,
    render: (_: any, record: any) => null, // handled by rowSelection
  },
  {
    title: 'Res. ID',
    dataIndex: 'resId',
    key: 'resId',
    width: 120,
    fixed: 'left' as 'left',
    sorter: (a: any, b: any) => a.resId.localeCompare(b.resId),
    render: (value: string, record: any) => {
      // Only show UsersIcon if type !== 'Space' and key is 5, 6, or 7
      const showUsersIcon = ['5', '6', '7'].includes(record.key) && record.type !== 'Space';
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span>{value}</span>
          {showUsersIcon && (
            <Tooltip title="Group Name">
              <img src={UsersIcon} alt="Group" style={{ width: 16, height: 16, opacity: 0.7 }} />
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 80,
    render: (value: string) => value,
  },
  {
    title: 'Res. Date',
    dataIndex: 'resDate',
    key: 'resDate',
    width: 120,
    render: (value: string) => value,
  },
  {
    title: 'Check-In',
    dataIndex: 'checkIn',
    key: 'checkIn',
    width: 130,
    render: (value: string) => {
      const [date, time] = value.split('\n');
      return (
        <span>
          {date}<br />
          <span className="checkinout-time" style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>{time}</span>
        </span>
      );
    },
  },
  {
    title: 'Check-Out',
    dataIndex: 'checkOut',
    key: 'checkOut',
    width: 130,
    render: (value: string) => {
      const [date, time] = value.split('\n');
      return (
        <span>
          {date}<br />
          <span className="checkinout-time" style={{ fontSize: 12, color: 'rgba(0,0,0,0.65)' }}>{time}</span>
        </span>
      );
    },
  },
  {
    title: 'Point of Contact',
    dataIndex: 'poc',
    key: 'poc',
    width: 180,
    render: (value: any) => value,
  },
  {
    title: 'Status',
    dataIndex: 'reservation',
    key: 'reservation',
    width: 120,
    render: (value: any, record: any) => {
      let status = '';
      if (typeof value === 'string') {
        status = value;
      } else if (value?.props?.children) {
        const children = value.props.children;
        status = typeof children === 'string' ? children : (children[1] || '').props?.children || '';
      }
      status = status.toLowerCase();
      let TagIcon = null;
      if (status.includes('in-house')) TagIcon = TagInhouse;
      else if (status.includes('cancelled')) TagIcon = TagCancelled;
      else if (status.includes('no show')) TagIcon = TagNoShow;
      else if (status.includes('checked-out')) TagIcon = TagCheckedout;
      else if (status.includes('unconfirmed')) TagIcon = TagUnconfirmed;
      else if (status.includes('confirmed')) TagIcon = TagConfirmed;
      else if (status.includes('transfer out')) TagIcon = TagTransferOut;
      return TagIcon ? <img src={TagIcon} alt={status} style={{ height: 22 }} /> : status;
    },
  },
  {
    title: 'Room/Space Name',
    dataIndex: 'roomName',
    key: 'roomName',
    width: 140,
  },
  {
    title: 'Room/Space Type',
    dataIndex: 'roomType',
    key: 'roomType',
    width: 140,
  },
  {
    title: 'Business Source',
    dataIndex: 'businessSource',
    key: 'businessSource',
    width: 160,
    render: (value: any, record: any, idx: number) => value,
  },
  {
    title: 'Cancellation Policy',
    dataIndex: 'cancellationPolicy',
    key: 'cancellationPolicy',
    width: 140,
  },
  {
    title: 'Total Charges ($)',
    dataIndex: 'totalCharges',
    key: 'totalCharges',
    width: 120,
  },
  {
    title: 'Amount Paid ($)',
    dataIndex: 'amountPaid',
    key: 'amountPaid',
    width: 120,
  },
  {
    title: 'Balance ($)',
    dataIndex: 'balance',
    key: 'balance',
    width: 120,
  },
  {
    title: '',
    key: 'actions',
    fixed: 'right' as 'right',
    width: 64,
    render: (_: any, record: any) => (
      <Dropdown
        overlay={<Menu><Menu.Item>Action</Menu.Item></Menu>}
        trigger={["click"]}
        placement="bottomRight"
        arrow
      >
        <Button type="text" icon={<span style={{ fontSize: 20 }}>⋮</span>} />
      </Dropdown>
    ),
  },
];

const cancellationPolicies = ['Non-Refundable', 'Free Cancellation', 'Flexible', 'Partial Refund'];
// Update checkIn for the first 20 rows in the main data array
const checkInDates = [
  'Jan 21, 2025',
  'Jan 20, 2025',
  'Jan 20, 2025',
  'Jan 19, 2025',
  'Jan 18, 2025',
  'Jan 18, 2025',
  'Jan 18, 2025',
  'Jan 18, 2025',
  'Jan 17, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 16, 2025',
  'Jan 14, 2025',
  'Jan 13, 2025',
  'Jan 12, 2025',
];
const data = [
  {
    key: '1',
    resId: '23456723',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[0]}\n03:00 PM`,
    checkOut: 'Jan 27 (Tue)\n11:00 AM',
    poc: (<div>Catherine Stever<br /><span style={{ color: '#888' }}>catherine@azure.com</span></div>),
    reservation: (<span style={{ background: '#E6F8FA', color: '#22607B', border: '1px solid #B6E9F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🛏️ In-House</span>),
    roomName: '101,102,103',
    roomType: 'STD, KNS, QNS',
    totalCharges: '100.00',
    balance: '0.00',
    businessSource: 'Booking.com',
    cancellationPolicy: cancellationPolicies[0],
    amountPaid: '100.00',
  },
  {
    key: '2',
    resId: '27892001',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[1]}\n03:00 PM`,
    checkOut: 'Jan 27 (Tue)\n11:00 AM',
    poc: (<div>Daniel Rodriguez<br /><span style={{ color: '#888' }}>daniel@circle.com</span></div>),
    reservation: (<span style={{ background: '#FFF5F5', color: '#822727', border: '1px solid #FEB2B2', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>❌ Cancelled</span>),
    roomName: '102',
    roomType: 'DBKS',
    totalCharges: '100.00',
    balance: '0.00',
    businessSource: 'Expedia',
    cancellationPolicy: cancellationPolicies[1],
    amountPaid: '100.00',
  },
  {
    key: '3',
    resId: '34567890',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[2]}\n03:00 PM`,
    checkOut: 'Jan 26 (Mon)\n11:00 AM',
    poc: (<div>Emily Chen<br /><span style={{ color: '#888' }}>emily@cloudline.com</span></div>),
    reservation: (<span style={{ background: '#FFFDEB', color: '#8D6B1B', border: '1px solid #FFF3BF', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>⚠️ No Show</span>),
    roomName: 'Main Banquet',
    roomType: 'Banquet',
    totalCharges: '172.00',
    balance: '72.00',
    businessSource: 'Agoda',
    cancellationPolicy: cancellationPolicies[2],
    amountPaid: '172.00',
  },
  {
    key: '4',
    resId: '45678901',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[3]}\n03:00 PM`,
    checkOut: 'Jan 26 (Mon)\n11:00 AM',
    poc: (<div>Fiona Gallagher<br /><span style={{ color: '#888' }}>fiona@dream.com</span></div>),
    reservation: (<span style={{ background: '#FFFAF0', color: '#7B341E', border: '1px solid #FBD38D', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🔁 Transfer Out</span>),
    roomName: '205',
    roomType: 'STD',
    totalCharges: '162.00',
    balance: '62.00',
    businessSource: 'Booking.com',
    cancellationPolicy: cancellationPolicies[3],
    amountPaid: '162.00',
  },
  {
    key: '5',
    resId: '56789012',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[4]}\n03:00 PM`,
    checkOut: 'Jan 28 (Wed)\n11:00 AM',
    poc: (<div>George Patel<br /><span style={{ color: '#888' }}>george@echo.com</span></div>),
    reservation: (<span style={{ background: '#FFF5F5', color: '#822727', border: '1px solid #FEB2B2', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>❌ Cancelled</span>),
    roomName: '310',
    roomType: 'DBKS',
    totalCharges: '52.00',
    balance: '52.00',
    businessSource: 'Expedia',
    cancellationPolicy: cancellationPolicies[0],
    amountPaid: '52.00',
  },
  {
    key: '6',
    resId: '67890123',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[5]}\n03:00 PM`,
    checkOut: 'Jan 28 (Wed)\n11:00 AM',
    poc: (<div>Hannah Lee<br /><span style={{ color: '#888' }}>hanna@fusion.com</span></div>),
    reservation: (<span style={{ background: 'rgba(0,0,0,0.02)', color: 'rgba(0,0,0,0.88)', border: '1px solid #D9D9D9', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>👤 Unconfirmed</span>),
    roomName: '444',
    roomType: 'DBKS',
    totalCharges: '75.00',
    balance: '75.00',
    businessSource: 'Agoda',
    cancellationPolicy: cancellationPolicies[1],
    amountPaid: '75.00',
  },
  {
    key: '7',
    resId: '78901234',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[6]}\n03:00 PM`,
    checkOut: 'Jan 29 (Thu)\n11:00 AM',
    poc: (<div>Ibrahim Khan<br /><span style={{ color: '#888' }}>ibrahim@galactic.com</span></div>),
    reservation: (<span style={{ background: '#F3F6FD', color: '#2C3A7B', border: '1px solid #BFD7F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🔄 Checked-Out</span>),
    roomName: '454',
    roomType: 'DBKS',
    totalCharges: '42.00',
    balance: '42.00',
    businessSource: 'Booking.com',
    cancellationPolicy: cancellationPolicies[2],
    amountPaid: '42.00',
  },
  {
    key: '8',
    resId: '89012345',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[7]}\n03:00 PM`,
    checkOut: 'Jan 20 (Tue)\n11:00 AM',
    poc: (<div>Jasmine Taylor<br /><span style={{ color: '#888' }}>jasmine@harbor.com</span></div>),
    reservation: (<span style={{ background: '#E6F8FA', color: '#22607B', border: '1px solid #B6E9F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🛏️ In-House</span>),
    roomName: '555',
    roomType: 'DBKS',
    totalCharges: '0.00',
    balance: '0.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[3],
    amountPaid: '0.00',
  },
  {
    key: '9',
    resId: '90123456',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[8]}\n03:00 PM`,
    checkOut: 'Jan 20 (Tue)\n11:00 AM',
    poc: (<div>Kyle Anderson<br /><span style={{ color: '#888' }}>kyle@illum.com</span></div>),
    reservation: (<span style={{ background: '#E6F8FA', color: '#22607B', border: '1px solid #B6E9F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🛏️ In-House</span>),
    roomName: '556',
    roomType: 'KNS',
    totalCharges: '42.00',
    balance: '42.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[0],
    amountPaid: '42.00',
  },
  {
    key: '10',
    resId: '12345678',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[9]}\n03:00 PM`,
    checkOut: 'Jan 20 (Tue)\n11:00 AM',
    poc: (<div>Laura Kim<br /><span style={{ color: '#888' }}>laura@terra.com</span></div>),
    reservation: (<span style={{ background: '#F0FFF4', color: '#22543D', border: '1px solid #9AE6B4', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>✅ Confirmed</span>),
    roomName: '778',
    roomType: 'KNS',
    totalCharges: '50.00',
    balance: '50.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[1],
    amountPaid: '50.00',
  },
  {
    key: '11',
    resId: '23456724',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[10]}\n03:00 PM`,
    checkOut: 'Jan 28 (Wed)\n11:00 AM',
    poc: (<div>Michael Scott<br /><span style={{ color: '#888' }}>michael@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#E6F8FA', color: '#22607B', border: '1px solid #B6E9F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🛏️ In-House</span>),
    roomName: '201',
    roomType: 'STD',
    totalCharges: '120.00',
    balance: '20.00',
    businessSource: 'ASI WebRes',
    cancellationPolicy: cancellationPolicies[2],
    amountPaid: '120.00',
  },
  {
    key: '12',
    resId: '27892002',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[11]}\n03:00 PM`,
    checkOut: 'Jan 28 (Wed)\n11:00 AM',
    poc: (<div>Pam Beesly<br /><span style={{ color: '#888' }}>pam@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#FFF5F5', color: '#822727', border: '1px solid #FEB2B2', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>❌ Cancelled</span>),
    roomName: '202',
    roomType: 'DBKS',
    totalCharges: '110.00',
    balance: '10.00',
    businessSource: 'Mobile',
    cancellationPolicy: cancellationPolicies[3],
    amountPaid: '110.00',
  },
  {
    key: '13',
    resId: '34567891',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[12]}\n03:00 PM`,
    checkOut: 'Jan 27 (Tue)\n11:00 AM',
    poc: (<div>Jim Halpert<br /><span style={{ color: '#888' }}>jim@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#FFFDEB', color: '#8D6B1B', border: '1px solid #FFF3BF', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>⚠️ No Show</span>),
    roomName: 'Main Hall',
    roomType: 'Banquet',
    totalCharges: '182.00',
    balance: '82.00',
    businessSource: 'Mobile',
    cancellationPolicy: cancellationPolicies[0],
    amountPaid: '182.00',
  },
  {
    key: '14',
    resId: '45678902',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[13]}\n03:00 PM`,
    checkOut: 'Jan 29 (Thu)\n11:00 AM',
    poc: (<div>Dwight Schrute<br /><span style={{ color: '#888' }}>dwight@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#F3F6FD', color: '#2C3A7B', border: '1px solid #BFD7F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>�� Checked-Out</span>),
    roomName: '206',
    roomType: 'STD',
    totalCharges: '172.00',
    balance: '72.00',
    businessSource: (<div>Expedia<br /><span style={{ color: '#888' }}>23456233</span> <span style={{ color: '#F5A623' }}>👑</span></div>),
    cancellationPolicy: cancellationPolicies[1],
    amountPaid: '172.00',
  },
  {
    key: '15',
    resId: '56789013',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[14]}\n03:00 PM`,
    checkOut: 'Jan 29 (Thu)\n11:00 AM',
    poc: (<div>Angela Martin<br /><span style={{ color: '#888' }}>angela@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#FFF5F5', color: '#822727', border: '1px solid #FEB2B2', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>❌ Cancelled</span>),
    roomName: '311',
    roomType: 'DBKS',
    totalCharges: '62.00',
    balance: '62.00',
    businessSource: (<div>Booking.com<br /><span style={{ color: '#888' }}>23456755</span></div>),
    cancellationPolicy: cancellationPolicies[2],
    amountPaid: '62.00',
  },
  {
    key: '16',
    resId: '67890124',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[15]}\n03:00 PM`,
    checkOut: 'Jan 29 (Thu)\n11:00 AM',
    poc: (<div>Oscar Martinez<br /><span style={{ color: '#888' }}>oscar@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: 'rgba(0,0,0,0.02)', color: 'rgba(0,0,0,0.88)', border: '1px solid #D9D9D9', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>👤 Unconfirmed</span>),
    roomName: '445',
    roomType: 'DBKS',
    totalCharges: '85.00',
    balance: '85.00',
    businessSource: 'Agoda',
    cancellationPolicy: cancellationPolicies[3],
    amountPaid: '85.00',
  },
  {
    key: '17',
    resId: '78901235',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[16]}\n03:00 PM`,
    checkOut: 'Jan 30 (Fri)\n11:00 AM',
    poc: (<div>Stanley Hudson<br /><span style={{ color: '#888' }}>stanley@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#F3F6FD', color: '#2C3A7B', border: '1px solid #BFD7F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🔄 Checked-Out</span>),
    roomName: '455',
    roomType: 'DBKS',
    totalCharges: '52.00',
    balance: '52.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[0],
    amountPaid: '52.00',
  },
  {
    key: '18',
    resId: '89012346',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[17]}\n03:00 PM`,
    checkOut: 'Jan 21 (Wed)\n11:00 AM',
    poc: (<div>Phyllis Vance<br /><span style={{ color: '#888' }}>phyllis@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#E6F8FA', color: '#22607B', border: '1px solid #B6E9F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🛏️ In-House</span>),
    roomName: '557',
    roomType: 'DBKS',
    totalCharges: '10.00',
    balance: '0.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[1],
    amountPaid: '10.00',
  },
  {
    key: '19',
    resId: '90123457',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[18]}\n03:00 PM`,
    checkOut: 'Jan 21 (Wed)\n11:00 AM',
    poc: (<div>Ryan Howard<br /><span style={{ color: '#888' }}>ryan@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#E6F8FA', color: '#22607B', border: '1px solid #B6E9F5', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>🛏️ In-House</span>),
    roomName: '558',
    roomType: 'KNS',
    totalCharges: '52.00',
    balance: '52.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[2],
    amountPaid: '52.00',
  },
  {
    key: '20',
    resId: '12345679',
    resDate: 'Dec 21, 2024',
    checkIn: `${checkInDates[19]}\n03:00 PM`,
    checkOut: 'Jan 21 (Wed)\n11:00 AM',
    poc: (<div>Kelly Kapoor<br /><span style={{ color: '#888' }}>kelly@dundermifflin.com</span></div>),
    reservation: (<span style={{ background: '#F0FFF4', color: '#22543D', border: '1px solid #9AE6B4', borderRadius: 4, padding: '2px 8px', fontWeight: 500, fontSize: 12, display: 'inline-block' }}>✅ Confirmed</span>),
    roomName: '779',
    roomType: 'KNS',
    totalCharges: '60.00',
    balance: '60.00',
    businessSource: 'Ctrip',
    cancellationPolicy: cancellationPolicies[3],
    amountPaid: '60.00',
  },
].map((row, idx) => idx < 20 ? { ...row, checkIn: `${checkInDates[idx]}\n03:00 PM` } : row);

const ManageReservations: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const searchInputRef = React.useRef<any>(null);
  const navigate = useNavigate();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filtersAll, setFiltersAll] = useState<any>({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
  const [pendingFiltersAll, setPendingFiltersAll] = useState<any>({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
  const [filtersCourtesy, setFiltersCourtesy] = useState<any>({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
  const [pendingFiltersCourtesy, setPendingFiltersCourtesy] = useState<any>({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
  const [filtersUnposted, setFiltersUnposted] = useState<any>({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
  const [pendingFiltersUnposted, setPendingFiltersUnposted] = useState<any>({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [searchTextCourtesy, setSearchTextCourtesy] = useState('');
  const [courtesySortOrder, setCourtesySortOrder] = useState<'ascend' | 'descend' | null>(null);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState<null | { type: string, key: string }>(null);
  // Sorting state for courtesy tab
  const [courtesySortColumn, setCourtesySortColumn] = useState<string | null>(null);
  const [showRooms, setShowRooms] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);
  // Add a state for filtered data in Unposted Reservations tab
  const [filteredDataUnposted, setFilteredDataUnposted] = useState(data.slice(0, 7));
  const [unpostedSortColumn, setUnpostedSortColumn] = useState<string | null>(null);
  const [unpostedSortOrder, setUnpostedSortOrder] = useState<'ascend' | 'descend' | null>(null);

  // Customize columns options for Unposted Reservations tab
  const unpostedCustomColumnOptions = [
    { key: 'reservation', label: 'Status' },
    { key: 'roomName', label: 'No. of Rooms' },
    { key: 'totalCharges', label: 'Total Charges ($)' },
    { key: 'balance', label: 'Balance ($)' },
    { key: 'businessSource', label: 'Business Source' },
    { key: 'unpostedReason', label: 'Unposted Reason' },
  ];

  const [unpostedCustomColumns, setUnpostedCustomColumns] = useState(
    unpostedCustomColumnOptions.map(col => ({ ...col, visible: true }))
  );

  const statusOptions = [
    { value: 'In-House', label: 'In-House' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'No Show', label: 'No Show' },
    { value: 'Checked-Out', label: 'Checked-Out' },
    { value: 'Unconfirmed', label: 'Unconfirmed' },
    { value: 'Confirmed', label: 'Confirmed' },
    { value: 'Transfer Out', label: 'Transfer Out' },
  ];
  const roomTypeOptions = [
    { value: 'STD', label: 'STD' },
    { value: 'DBKS', label: 'DBKS' },
    { value: 'Banquet', label: 'Banquet' },
    { value: 'KNS', label: 'KNS' },
  ];
  const businessSourceOptions = [
    { value: 'Walk-In', label: 'Walk-In' },
    { value: 'ASI WebRes', label: 'ASI WebRes' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Expedia', label: 'Expedia' },
    { value: 'Booking.com', label: 'Booking.com' },
    { value: 'Agoda', label: 'Agoda' },
    { value: 'CRS', label: 'CRS' },
  ];
  const businessSourceOptionsCourtesy = [
    { value: 'Walk-In', label: 'Walk-In' },
    { value: 'ASI WebRes', label: 'ASI WebRes' },
  ];
  const loyaltyStatusOptions = [
    { value: 'Genius', label: 'Genius' },
  ];
  const cancellationPolicyOptions = [
    { value: 'Non-Refundable', label: 'Non-Refundable' },
    { value: 'Free Cancellation', label: 'Free Cancellation' },
    { value: 'Flexible', label: 'Flexible' },
    { value: 'Partial Refund', label: 'Partial Refund' },
  ];
  const courtesyStatusOptions = [
    { value: 'Unconfirmed', label: 'Unconfirmed' },
    { value: 'Confirmed', label: 'Confirmed' },
  ];

  // Business Source options for filter (Unposted Reservations tab)
  const unpostedBusinessSourceOptions = [
    { value: 'Expedia', label: 'Expedia' },
    { value: 'Booking.com', label: 'Booking.com' },
    { value: 'Agoda', label: 'Agoda' },
  ];

  const businessSourceOptionsUnposted = [
    { value: 'Agoda', label: 'Agoda' },
    { value: 'Booking.com', label: 'Booking.com' },
    { value: 'Expedia', label: 'Expedia' },
  ];

  React.useEffect(() => {
    if (searchText.trim() && activeTab === '1') {
      const lower = searchText.trim().toLowerCase();
      const results = data.filter(row => {
        const pocName = row.poc?.props?.children?.[0] || '';
        const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
        const roomName = row.roomName || '';
        return (
          row.resId.toLowerCase().includes(lower) ||
          (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
          (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower)) ||
          (typeof roomName === 'string' && roomName.toLowerCase().includes(lower))
        );
      });
      setFilteredData(results);
      setDropdownVisible(results.length > 0);
    } else if (activeTab === '1') {
      setFilteredData(data);
      setDropdownVisible(false);
    }
  }, [searchText, activeTab, data]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (activeTab === '1') {
      if (value.trim()) {
        const lower = value.trim().toLowerCase();
        const filtered = data.filter(row => {
          const pocName = row.poc?.props?.children?.[0] || '';
          const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
          return (
            row.resId.toLowerCase().includes(lower) ||
            (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
            (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower)) ||
            (row.roomName && row.roomName.toLowerCase().includes(lower))
          );
        });
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }
  };

  const handleDropdownClick = (row: any) => {
    setDropdownVisible(false);
    setSearchText('');
    navigate(`/update-reservation/${row.resId}`);
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
    setSearchText('');
    setFilteredData(data);
    setDropdownVisible(false);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 48, // Set checkbox column width to 48px for all tabs
    getCheckboxProps: (record: any) => ({
      disabled: record.poc?.props?.children?.[0] === 'Disabled User',
      name: record.poc?.props?.children?.[0],
    }),
  };

  // For All Reservations tab, inject Type field into data
  const updatedData = data.map((row, idx) => {
    // Determine the page and row index
    // Assuming page size is 10
    const pageSize = 10;
    const page = Math.floor(idx / pageSize) + 1;
    const rowOnPage = idx % pageSize;
    let type = 'Room';
    if ((page === 1 || page === 2) && rowOnPage === 2) {
      type = 'Space';
    }
    return { ...row, type };
  });

  // Filtering for Rooms/Spaces toggles for both tabs
  const filteredAllReservationsDataByType = React.useMemo(() => {
    if (showRooms && showSpaces) return updatedData;
    if (!showRooms && !showSpaces) return [];
    if (showRooms) return updatedData.filter(row => row.type === 'Room');
    if (showSpaces) return updatedData.filter(row => row.type === 'Space');
    return updatedData;
  }, [showRooms, showSpaces, updatedData]);

  // Use filteredAllReservationsDataByType for All Reservations tab
  const pagedData = (activeTab === '1' ? filteredAllReservationsDataByType : data).slice((current - 1) * pageSize, current * pageSize);

  const getPendingFiltersForTab = () => {
    if (activeTab === '1') return pendingFiltersAll;
    if (activeTab === '2') return pendingFiltersCourtesy;
    if (activeTab === '3') return pendingFiltersUnposted;
    return {};
  };

  const isAnyFilterActive = (() => {
    const pf = getPendingFiltersForTab();
    return !!(
      (pf.dateRange && pf.dateRange.length > 0) ||
      (pf.status && pf.status.length > 0) ||
      (pf.roomType && pf.roomType.length > 0) ||
      (pf.businessSource && pf.businessSource.length > 0) ||
      (pf.loyaltyStatus && pf.loyaltyStatus.length > 0) ||
      (pf.cancellationPolicy && pf.cancellationPolicy.length > 0)
    );
  })();

  const getFilteredCount = () => {
    let filtered = data;
    if (pendingFiltersAll.dateRange) {
      const [start, end] = pendingFiltersAll.dateRange;
      filtered = filtered.filter(row => {
        const checkInDate = row.checkIn.split('\n')[0];
        const checkInDayjs = dayjs(checkInDate);
        return (
          checkInDayjs.isSameOrAfter(start, 'day') &&
          checkInDayjs.isSameOrBefore(end, 'day')
        );
      });
    }
    if (pendingFiltersAll.status.length) {
      // Map status filter values to the tag SVGs used in the table
      const statusToTag: Record<string, string> = {
        'In-House': 'TagInhouse.svg',
        'Cancelled': 'TagCancelled.svg',
        'No Show': 'TagNo-Show.svg',
        'Checked-Out': 'TagCheckedout.svg',
        'Unconfirmed': 'TagUnconfirmed.svg',
        'Confirmed': 'TagConfirmed.svg',
        'Transfer Out': 'TagTransfer Out.svg',
      };
      filtered = filtered.filter(row => {
        let tagFile = '';
        // Determine which tag SVG is rendered for this row
        if (row.reservation && row.reservation.type === 'img' && row.reservation.props && row.reservation.props.src) {
          // If reservation is an <img> (shouldn't be, but fallback)
          tagFile = row.reservation.props.src.split('/').pop();
        } else if (row.reservation?.props?.children) {
          // The render logic in the Status column uses Tag SVGs based on status string
          let status = '';
          const children = row.reservation.props.children;
          if (Array.isArray(children)) {
            status = children.find(child => typeof child === 'string' && child.trim() && !/^[\u1F300-\u1F6FF\u2600-\u26FF\u2700-\u27BF]+$/.test(child.trim()));
            if (!status && children.length > 1 && typeof children[1] === 'string') {
              status = children[1];
            }
          } else if (typeof children === 'string') {
            status = children;
          }
          status = status.trim();
          // Map status string to tag SVG filename
          if (status.toLowerCase().includes('in-house')) tagFile = 'TagInhouse.svg';
          else if (status.toLowerCase().includes('cancelled')) tagFile = 'TagCancelled.svg';
          else if (status.toLowerCase().includes('no show')) tagFile = 'TagNo-Show.svg';
          else if (status.toLowerCase().includes('checked-out')) tagFile = 'TagCheckedout.svg';
          else if (status.toLowerCase().includes('unconfirmed')) tagFile = 'TagUnconfirmed.svg';
          else if (status.toLowerCase().includes('confirmed')) tagFile = 'TagConfirmed.svg';
          else if (status.toLowerCase().includes('transfer out')) tagFile = 'TagTransfer Out.svg';
        }
        // Now, check if any selected status maps to this tagFile
        return pendingFiltersAll.status.some((selectedStatus: string) => statusToTag[selectedStatus as keyof typeof statusToTag] === tagFile);
      });
    }
    if (pendingFiltersAll.roomType.length) {
      filtered = filtered.filter(row => pendingFiltersAll.roomType.includes(row.roomType));
    }
    if (pendingFiltersAll.businessSource.length) {
      filtered = filtered.filter(row => {
        let bs: any = row.businessSource;
        if (typeof bs === 'object' && bs !== null && 'props' in bs) bs = bs.props?.children?.[0] || '';
        return pendingFiltersAll.businessSource.some((s: any) => typeof bs === 'string' && bs.toLowerCase().includes(s.toLowerCase()));
      });
    }
    if (pendingFiltersAll.loyaltyStatus && pendingFiltersAll.loyaltyStatus.length) {
      filtered = filtered.filter(row => {
        if (pendingFiltersAll.loyaltyStatus && (pendingFiltersAll.loyaltyStatus as any).includes('Genius')) {
          if (typeof row.businessSource === 'string' && row.businessSource.toLowerCase().includes('expedia')) {
            return true;
          }
          if (
            typeof row.businessSource === 'object' &&
            row.businessSource !== null &&
            'props' in row.businessSource &&
            row.businessSource.props?.children &&
            row.businessSource.props.children[0] === 'Expedia'
          ) {
            return true;
          }
          return false;
        }
        return true;
      });
    }
    if ((pendingFiltersAll.cancellationPolicy || []).length) {
      filtered = filtered.filter(row =>
        (pendingFiltersAll.cancellationPolicy as any).some((s: any) => (pendingFiltersAll.cancellationPolicy || []).includes(row.cancellationPolicy))
      );
    }
    // After businessSource filter in All Reservations tab filter logic:
    if (pendingFiltersAll.loyaltyStatus && pendingFiltersAll.loyaltyStatus.length) {
      filtered = filtered.filter(row => {
        // Only show rows with the loyaltyprogram.svg icon in Business Source
        if (typeof row.businessSource === 'object' && row.businessSource !== null && 'props' in row.businessSource) {
          const children = row.businessSource.props.children;
          // Check if any child is the loyalty program icon
          if (Array.isArray(children)) {
            return children.some(child =>
              child && child.props && child.props.src &&
              typeof child.props.src === 'string' &&
              child.props.src.includes('loyaltyprogram.svg')
            );
          }
        }
        return false;
      });
    }
    return filtered.length;
  };

  const customColumnOptions = [
    { key: 'reservation', label: 'Status' },
    { key: 'roomName', label: 'Room/Space Name' },
    { key: 'roomType', label: 'Room/Space Type' },
    { key: 'businessSource', label: 'Business Source' },
    { key: 'cancellationPolicy', label: 'Cancellation Policy' },
    { key: 'totalCharges', label: 'Total Charges ($)' },
    { key: 'amountPaid', label: 'Amount Paid ($)' },
    { key: 'balance', label: 'Balance ($)' },
  ];

  const courtesyCustomColumnOptions = [
    { key: 'roomName', label: 'Room/Space Name' },
    { key: 'roomType', label: 'Room/Space Type' },
    { key: 'businessSource', label: 'Business Source' },
    { key: 'cancellationPolicy', label: 'Cancellation Policy' },
  ];

  const [allReservationsCustomColumns, setAllReservationsCustomColumns] = useState(
    customColumnOptions.map(col => ({ ...col, visible: true }))
  );

  const [courtesyCustomColumnsState, setCourtesyCustomColumnsState] = useState(
    courtesyCustomColumnOptions.map(col => ({ ...col, visible: true }))
  );

  const [customizeOpen, setCustomizeOpen] = useState(false);

  const handleToggleColumn = (key: string) => {
    if (activeTab === '2') {
      setCourtesyCustomColumnsState(cols =>
      cols.map(col =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
    } else if (activeTab === '3') {
      setUnpostedCustomColumns(cols =>
        cols.map(col =>
          col.key === key ? { ...col, visible: !col.visible } : col
        )
      );
    } else {
      setAllReservationsCustomColumns(cols =>
        cols.map(col =>
          col.key === key ? { ...col, visible: !col.visible } : col
        )
      );
    }
  };

  const handleMoveColumn = (from: number, to: number) => {
    if (activeTab === '2') {
      setCourtesyCustomColumnsState(cols => {
      const updated = [...cols];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
    } else if (activeTab === '3') {
      setUnpostedCustomColumns(cols => {
        const updated = [...cols];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        return updated;
      });
    } else {
      setAllReservationsCustomColumns(cols => {
        const updated = [...cols];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        return updated;
      });
    }
  };

  const CustomizeColumnsDropdown = () => {
    let currentColumns = allReservationsCustomColumns;
    let setColumns = setAllReservationsCustomColumns;
    if (activeTab === '2') {
      currentColumns = courtesyCustomColumnsState;
      setColumns = setCourtesyCustomColumnsState;
    } else if (activeTab === '3') {
      currentColumns = unpostedCustomColumns;
      setColumns = setUnpostedCustomColumns;
    }
    return (
    <div style={{ minWidth: 240, background: '#fff', borderRadius: 8, boxShadow: '0 6px 16px 0 rgba(0,0,0,0.08),0 3px 6px -4px rgba(0,0,0,0.12),0 9px 28px 8px rgba(0,0,0,0.05)', padding: 4 }}>
      <div style={{ fontWeight: 600, fontSize: 14, padding: '12px 16px 8px 16px', borderBottom: '1px solid #f0f0f0' }}>Customize columns</div>
      <div style={{ maxHeight: 320, overflowY: 'auto', padding: '8px 0' }}>
          {currentColumns.map((col, idx) => (
          <div key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 16px', cursor: 'grab', marginBottom: 8 }}
            draggable
            onDragStart={e => { e.dataTransfer.setData('colIdx', String(idx)); }}
            onDrop={e => { e.preventDefault(); const from = Number(e.dataTransfer.getData('colIdx')); handleMoveColumn(from, idx); }}
            onDragOver={e => e.preventDefault()}>
              <img src={DragIcon} alt="drag" style={{ width: 20, height: 20, opacity: 0.45, marginRight: 8, cursor: 'grab' }} />
            <Checkbox checked={col.visible} onChange={() => handleToggleColumn(col.key)} style={{ marginRight: 8 }} />
            <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.88)', whiteSpace: 'nowrap', flex: 1 }}>{col.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
  }

  // Insert the new Type column after Res. ID and freeze it
  const typeColumn = {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    fixed: 'left' as 'left',
    render: (value: string, _record: any) => <span>{value}</span>,
    sorter: (a: any, b: any) => String(a.type).localeCompare(String(b.type)),
    sortOrder: courtesySortColumn === 'type' ? courtesySortOrder : undefined,
    onHeaderCell: () => ({
      onClick: () => {
        setCourtesySortColumn('type');
        setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
      },
    }),
  };

  // Add Type column to both tabs, frozen after Res. ID
  const baseColumns = [
    { ...columns[0], fixed: 'left' as 'left',
      sorter: (a: any, b: any) => String(a.resId).localeCompare(String(b.resId)),
      sortOrder: activeTab === '2' && courtesySortColumn === 'resId' ? courtesySortOrder : undefined,
      onHeaderCell: activeTab === '2' ? () => ({
        onClick: () => {
          setCourtesySortColumn('resId');
          setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
        },
      }) : undefined,
    },
    typeColumn,
    { ...columns[1], fixed: 'left' as 'left',
      sorter: (a: any, b: any) => {
        const dateA = new Date(a.checkIn.split('\n')[0]);
        const dateB = new Date(b.checkIn.split('\n')[0]);
        return dateA.getTime() - dateB.getTime();
      },
      sortOrder: activeTab === '2' && courtesySortColumn === 'checkIn' ? courtesySortOrder : undefined,
      onHeaderCell: activeTab === '2' ? () => ({
        onClick: () => {
          setCourtesySortColumn('checkIn');
          setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
        },
      }) : undefined,
    },
    { ...columns[2], fixed: 'left' as 'left',
      sorter: (a: any, b: any) => {
        const dateA = new Date(a.checkOut.split('\n')[0]);
        const dateB = new Date(b.checkOut.split('\n')[0]);
        return dateA.getTime() - dateB.getTime();
      },
      sortOrder: activeTab === '2' && courtesySortColumn === 'checkOut' ? courtesySortOrder : undefined,
      onHeaderCell: activeTab === '2' ? () => ({
        onClick: () => {
          setCourtesySortColumn('checkOut');
          setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
        },
      }) : undefined,
    },
    { ...columns[3], fixed: 'left' as 'left',
      sorter: (a: any, b: any) => {
        const nameA = a.poc?.props?.children?.[0] || '';
        const nameB = b.poc?.props?.children?.[0] || '';
        return String(nameA).localeCompare(String(nameB));
      },
      sortOrder: activeTab === '2' && courtesySortColumn === 'poc' ? courtesySortOrder : undefined,
      onHeaderCell: activeTab === '2' ? () => ({
        onClick: () => {
          setCourtesySortColumn('poc');
          setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
        },
      }) : undefined,
    },
    // Add sorting for Total Charges and Balance columns
    { ...columns[7],
      sorter: (a: any, b: any) => parseFloat(a.totalCharges) - parseFloat(b.totalCharges),
      sortOrder: activeTab === '2' && courtesySortColumn === 'totalCharges' ? courtesySortOrder : undefined,
      onHeaderCell: activeTab === '2' ? () => ({
        onClick: () => {
          setCourtesySortColumn('totalCharges');
          setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
        },
      }) : undefined,
    },
    { ...columns[8],
      sorter: (a: any, b: any) => parseFloat(a.balance) - parseFloat(b.balance),
      sortOrder: activeTab === '2' && courtesySortColumn === 'balance' ? courtesySortOrder : undefined,
      onHeaderCell: activeTab === '2' ? () => ({
        onClick: () => {
          setCourtesySortColumn('balance');
          setCourtesySortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
        },
      }) : undefined,
    },
  ];

  // The last column (actions) should be fixed right
  const actionsColumn = { ...columns[columns.length - 1], render: ActionsColumn, fixed: 'right' as 'right' };
  const customColumnsForTable = activeTab === '2' ? courtesyCustomColumnsState : allReservationsCustomColumns;
  const dynamicColumns = customColumnsForTable.filter(col => col.visible).map(col => columns.find(c => c.key === col.key)).filter((c): c is typeof columns[number] => Boolean(c));
  // Remove any duplicate columns from dynamicColumns that are already in baseColumns or actionsColumn
  const baseKeys = new Set(baseColumns.map(col => col.key));
  const dynamicFiltered = dynamicColumns.filter(col => !baseKeys.has(col.key) && col.key !== actionsColumn.key);
  const finalColumns = [
    ...baseColumns,
    ...dynamicFiltered,
    actionsColumn,
  ];

  // Courtesy Holds tab data and columns
  const courtesyStatuses = ['Unconfirmed', 'Confirmed'];
  const courtesyStatusIcons: Record<string, string> = {
    Unconfirmed: UnconfirmedIcon,
    Confirmed: ConfirmedIcon,
  };
  // Only these business sources for courtesy tab
  const courtesyBusinessSources = ['Walk-in', 'ASI WebRes'];
  // Generate courtesyDataRaw with businessSource and roomName modifications
  const courtesyCheckInDates = checkInDates.slice(0, 7);
  const courtesyDataRaw = [
    {
      key: '1',
      resId: '23456723',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Room',
      checkIn: `${courtesyCheckInDates[0]}\n03:00 PM`,
      checkOut: 'Jan 27 (Tue)\n11:00 AM',
      poc: (<div>Catherine Stever<br /><span style={{ color: '#888' }}>catherine@azure.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={UnconfirmedIcon} alt="Unconfirmed" style={{ height: 22 }} />Unconfirmed</span>),
      reservationStatus: 'Unconfirmed',
      roomName: '2',
      roomType: 'STD',
      totalCharges: '',
      balance: '',
      businessSource: 'Walk-in',
      cancellationPolicy: 'Non-Refundable',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 20 (Tue)',
      holdId: '478299',
    },
    {
      key: '2',
      resId: '27892001',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Space',
      checkIn: `${courtesyCheckInDates[1]}\n03:00 PM`,
      checkOut: 'Jan 27 (Tue)\n11:00 AM',
      poc: (<div>Daniel Rodriguez<br /><span style={{ color: '#888' }}>daniel@circle.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={ConfirmedIcon} alt="Confirmed" style={{ height: 22 }} />Confirmed</span>),
      reservationStatus: 'Confirmed',
      roomName: '1',
      roomType: 'Banquet',
      totalCharges: '',
      balance: '',
      businessSource: 'ASI WebRes',
      cancellationPolicy: 'Free Cancellation',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 20 (Tue)',
      holdId: '478300',
    },
    {
      key: '3',
      resId: '34567890',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Room',
      checkIn: `${courtesyCheckInDates[2]}\n03:00 PM`,
      checkOut: 'Jan 26 (Mon)\n11:00 AM',
      poc: (<div>Emily Chen<br /><span style={{ color: '#888' }}>emily@cloudline.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={UnconfirmedIcon} alt="Unconfirmed" style={{ height: 22 }} />Unconfirmed</span>),
      reservationStatus: 'Unconfirmed',
      roomName: '1',
      roomType: 'STD',
      totalCharges: '',
      balance: '',
      businessSource: 'Walk-in',
      cancellationPolicy: 'Flexible',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 20 (Tue)',
      holdId: '478301',
    },
    {
      key: '4',
      resId: '45678901',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Space',
      checkIn: `${courtesyCheckInDates[3]}\n03:00 PM`,
      checkOut: 'Jan 26 (Mon)\n11:00 AM',
      poc: (<div>Fiona Gallagher<br /><span style={{ color: '#888' }}>fiona@dream.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={ConfirmedIcon} alt="Confirmed" style={{ height: 22 }} />Confirmed</span>),
      reservationStatus: 'Confirmed',
      roomName: '1',
      roomType: 'Banquet',
      totalCharges: '',
      balance: '',
      businessSource: '',
      cancellationPolicy: 'Partial Refund',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 24 (Sat)',
      holdId: '478302',
    },
    {
      key: '5',
      resId: '56789012',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Room',
      checkIn: `${courtesyCheckInDates[4]}\n03:00 PM`,
      checkOut: 'Jan 28 (Wed)\n11:00 AM',
      poc: (<div>George Patel<br /><span style={{ color: '#888' }}>george@echo.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={UnconfirmedIcon} alt="Unconfirmed" style={{ height: 22 }} />Unconfirmed</span>),
      reservationStatus: 'Unconfirmed',
      roomName: '7',
      roomType: 'STD',
      totalCharges: '',
      balance: '',
      businessSource: 'Walk-in',
      cancellationPolicy: 'Non-Refundable',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 25 (Sun)',
      holdId: '478303',
    },
    {
      key: '6',
      resId: '67890123',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Space',
      checkIn: `${courtesyCheckInDates[5]}\n03:00 PM`,
      checkOut: 'Jan 28 (Wed)\n11:00 AM',
      poc: (<div>Hannah Lee<br /><span style={{ color: '#888' }}>hanna@fusion.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={ConfirmedIcon} alt="Confirmed" style={{ height: 22 }} />Confirmed</span>),
      reservationStatus: 'Confirmed',
      roomName: '1',
      roomType: 'Banquet',
      totalCharges: '',
      balance: '',
      businessSource: 'ASI WebRes',
      cancellationPolicy: 'Free Cancellation',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 25 (Sun)',
      holdId: '478304',
    },
    {
      key: '7',
      resId: '78901234',
      resDate: 'Dec 21, 2024', // sample value
      type: 'Room',
      checkIn: `${courtesyCheckInDates[6]}\n03:00 PM`,
      checkOut: 'Jan 29 (Thu)\n11:00 AM',
      poc: (<div>Ibrahim Khan<br /><span style={{ color: '#888' }}>ibrahim@galactic.com</span></div>),
      reservation: (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><img src={UnconfirmedIcon} alt="Unconfirmed" style={{ height: 22 }} />Unconfirmed</span>),
      reservationStatus: 'Unconfirmed',
      roomName: '11',
      roomType: 'STD',
      totalCharges: '',
      balance: '',
      businessSource: 'Walk-in',
      cancellationPolicy: 'Flexible',
      amountPaid: '0.00', // sample value
      holdReleaseDate: 'Jan 26 (Mon)',
      holdId: '478305',
    },
  ].map((row, idx) => ({
    ...row,
    resDate: row.resDate || 'Dec 21, 2024',
    amountPaid: row.amountPaid || '0.00',
    checkIn: `${checkInDates[idx]}\n03:00 PM`,
  }));
  // Remove Total Charges and Balance columns for courtesy tab
  const courtesyColumns = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 48,
      fixed: 'left' as const,
      render: (_: any, record: any) => null, // handled by rowSelection
    },
    {
      title: 'Res. ID',
      dataIndex: 'resId',
      key: 'resId',
      width: 120,
      fixed: 'left' as const,
      sorter: (a: any, b: any) => a.resId.localeCompare(b.resId),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      fixed: 'left' as const,
    },
    {
      title: 'Res. Date',
      dataIndex: 'resDate',
      key: 'resDate',
      width: 130,
      fixed: 'left' as const,
    },
    {
      title: 'Check-In',
      dataIndex: 'checkIn',
      key: 'checkIn',
      width: 140,
      fixed: 'left' as const,
    },
    {
      title: 'Check-Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
      width: 140,
      fixed: 'left' as const,
    },
    {
      title: 'Point of Contact',
      dataIndex: 'poc',
      key: 'poc',
      width: 180,
      fixed: 'left' as const,
    },
    {
      title: 'Status',
      dataIndex: 'reservationStatus',
      key: 'reservationStatus',
      width: 120,
      render: (status: string) => {
        if (status === 'Unconfirmed') {
          return <img src={TagUnconfirmed} alt="Unconfirmed" style={{ height: 22 }} />;
        }
        if (status === 'Confirmed') {
          return <img src={TagConfirmed} alt="Confirmed" style={{ height: 22 }} />;
        }
        return status;
      },
    },
    {
      title: 'Room/Space Name',
      dataIndex: 'roomName',
      key: 'roomName',
      width: 140,
    },
    {
      title: 'Room/Space Type',
      dataIndex: 'roomType',
      key: 'roomType',
      width: 140,
    },
    {
      title: 'Business Source',
      dataIndex: 'businessSource',
      key: 'businessSource',
      width: 140,
    },
    {
      title: 'Cancellation Policy',
      dataIndex: 'cancellationPolicy',
      key: 'cancellationPolicy',
      width: 160,
    },
    {
      title: 'Total Charges ($)',
      dataIndex: 'totalCharges',
      key: 'totalCharges',
      width: 140,
    },
    {
      title: 'Amount Paid ($)',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      width: 140,
    },
    {
      title: 'Balance ($)',
      dataIndex: 'balance',
      key: 'balance',
      width: 120,
    },
    {
      title: '',
      key: 'actions',
      dataIndex: 'actions',
      width: 60,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <span style={{ cursor: 'pointer' }}>...</span>
      ),
    },
  ];

  // Courtesy Hold tab: filter by Rooms/Spaces toggles before search/sort
  const filteredCourtesyDataByType = React.useMemo(() => {
    if (showRooms && showSpaces) return courtesyDataRaw;
    if (!showRooms && !showSpaces) return [];
    if (showRooms) return courtesyDataRaw.filter(row => row.type === 'Room');
    if (showSpaces) return courtesyDataRaw.filter(row => row.type === 'Space');
    return courtesyDataRaw;
  }, [showRooms, showSpaces, courtesyDataRaw]);

  // Sorting logic for courtesy tab (use filteredCourtesyDataByType)
  const sortedCourtesyData = React.useMemo(() => {
    if (!courtesySortColumn || !courtesySortOrder) return filteredCourtesyDataByType;
    const col = courtesyColumns.find(c => c.key === courtesySortColumn);
    if (!col || !col.sorter) return filteredCourtesyDataByType;
    const sorted = [...filteredCourtesyDataByType].sort((a, b) => (col.sorter as any)(a, b));
    if (courtesySortOrder === 'descend') sorted.reverse();
    return sorted;
  }, [courtesySortColumn, courtesySortOrder, courtesyColumns, filteredCourtesyDataByType]);

  // Search logic for courtesy tab (use sortedCourtesyData)
  const filteredDataCourtesySorted = searchTextCourtesy.trim()
    ? sortedCourtesyData.filter(row => {
        const pocName = row.poc?.props?.children?.[0] || '';
        const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
        const lower = searchTextCourtesy.trim().toLowerCase();
        return (
          row.resId.toLowerCase().includes(lower) ||
          (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
          (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower))
        );
      })
    : sortedCourtesyData;

  function ActionsColumn(_: any, record: any) {
    let status = '';
    if (typeof record.reservation === 'string') {
      status = record.reservation;
    } else if (record.reservation?.props?.children) {
      const children = record.reservation.props.children;
      status = typeof children === 'string' ? children : (children[1] || '').props?.children || '';
    }
    status = status.toLowerCase();
    const reservationStatus = (record.reservationStatus || '').toLowerCase();
    const isUnconfirmed = status.includes('unconfirmed') || reservationStatus.includes('unconfirmed');
    const isConfirmed = status.includes('confirmed') || reservationStatus.includes('confirmed');
    const isInhouse = status.includes('in-house');
    const isCancelled = status.includes('cancelled');
    const isTransferOut = status.includes('transfer out');
    const isCheckedOut = status.includes('checked-out');

    let menu = null;
    if (activeTab === '2' && (isUnconfirmed || isConfirmed)) {
      menu = (
        <Menu>
          <Menu.Item key="convert" onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'convert', key: record.key }); }}>
            Convert to Reservation
          </Menu.Item>
          <Menu.Item key="cancel" danger onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'cancel_courtesy', key: record.key }); }}>
            Cancel Courtesy Hold
          </Menu.Item>
        </Menu>
      );
    } else if (isUnconfirmed || isConfirmed) {
      menu = (
        <Menu>
          <Menu.Item key="checkin" onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'checkin', key: record.key }); }}>
            Check-In
          </Menu.Item>
          <Menu.Item key="noshow" onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'noshow', key: record.key }); }}>
            No-Show Reservation
          </Menu.Item>
          <Menu.Item key="transferout" onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'transferout', key: record.key }); }}>
            Transfer Out Reservation
          </Menu.Item>
          <Menu.Item key="cancel" danger onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'cancel', key: record.key }); }}>
            Cancel Reservation
          </Menu.Item>
        </Menu>
      );
    } else if (isInhouse) {
      menu = (
        <Menu>
          <Menu.Item key="checkout" onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'checkout', key: record.key }); }}>
            Check-Out
          </Menu.Item>
        </Menu>
      );
    }

    const shouldDisable = isCancelled || isTransferOut || isCheckedOut;

    if (!menu || shouldDisable) {
      return (
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'not-allowed',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            outline: 'none',
            transition: 'background 0.2s',
            opacity: 0.4,
          }}
          disabled
        >
          <img src={ActionMenuIcon} alt="Action" style={{ width: 24, height: 24, opacity: 0.45 }} />
        </button>
      );
    }

    return (
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" arrow getPopupContainer={() => document.body}>
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 8,
            outline: 'none',
            transition: 'background 0.2s',
          }}
          onClick={e => { e.stopPropagation(); }}
          onMouseDown={e => { e.stopPropagation(); }}
          onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px #3E4BE033')}
          onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
          onMouseOver={e => (e.currentTarget.style.background = '#f5f5f5')}
          onMouseOut={e => (e.currentTarget.style.background = 'none')}
        >
          <img src={ActionMenuIcon} alt="Action" style={{ width: 24, height: 24, opacity: 0.45 }} />
        </button>
      </Dropdown>
    );
  }

  // Reorder columns for All Reservations tab
  const allReservationsColumnOrder = [
    'resId',        // 1. Res. ID (Freeze)
    'type',         // 2. Type (Freeze)
    'resDate',      // 3. Res. Date (Freeze)
    'checkIn',      // 4. Check-In (Freeze)
    'checkOut',     // 5. Check-Out (Freeze)
    'poc',          // 6. Point of Contact (Freeze)
    'reservation',  // 7. Status
    'roomName',     // 8. Room/Space Name
    'roomType',     // 9. Room/Space Type
    'businessSource', // 10. Business Source
    'cancellationPolicy', // 11. Cancellation Policy
    'totalCharges', // 12. Total Charges ($)
    'amountPaid',   // 13. Amount Paid ($)
    'balance',      // 14. Balance ($)
    'actions'       // 15. Action Columns (Freeze)
  ];

  // Define the keys for frozen columns in All Reservations tab
  const allReservationsFrozenKeys = ['resId', 'type', 'checkIn', 'checkOut', 'poc', 'actions'];

  // Insert the new Type column into the columns array if not already present
  const columnsWithType = (() => {
    const exists = columns.some(col => col.key === 'type');
    if (exists) return columns;
    const newCols = [...columns];
    newCols.splice(1, 0, typeColumn); // Insert after Res. ID
    return newCols;
  })();

  // In getTabColumns for All Reservations tab, use columnsWithType instead of columns
  function getTabColumns(tabKey: string) {
    if (tabKey === '1') {
      // All Reservations tab
      const colMap = Object.fromEntries(columnsWithType.map(col => [col.key, col]));
      // Frozen columns always visible
      const frozenKeys = ['resId', 'type', 'resDate', 'checkIn', 'checkOut', 'poc', 'actions'];
      // Non-frozen columns toggled by customize columns
      const visibleNonFrozenKeys = allReservationsCustomColumns.filter(col => col.visible && !frozenKeys.includes(col.key)).map(col => col.key);
      // Final order: always all frozen, then visible non-frozen, in the specified order
      const orderedCols = allReservationsColumnOrder.map(key => {
        if (key === 'actions') {
          return { ...columnsWithType[columnsWithType.length - 1], render: ActionsColumn, fixed: 'right' as 'right' };
        }
        if (frozenKeys.includes(key)) {
          return { ...colMap[key], fixed: 'left' as 'left' };
        }
        if (visibleNonFrozenKeys.includes(key)) {
          return colMap[key];
        }
        return null;
      }).filter(Boolean);
      return orderedCols;
    }
    if (tabKey === '2') return courtesyColumns;
    if (tabKey === '3') {
      // Unposted Reservations tab
      // Arrange columns as per the required order
      // 1. CRS ID (Freeze)
      // 2. Check-In (Freeze)
      // 3. Check-Out (Freeze)
      // 4. Point of Contact (Freeze)
      // 5. Status
      // 6. No. of Rooms
      // 7. Total Charges ($)
      // 8. Balance ($)
      // 9. Business Source
      // 10. Unposted Reason
      // Use customize columns state for visibility
      const visibleCols = unpostedCustomColumns.filter(col => col.visible).map(col => col.key);
      const crsIdCol = {
        ...columns[0],
        title: 'CRS ID',
        fixed: 'left' as 'left',
        sorter: (a: any, b: any) => String(a.resId).localeCompare(String(b.resId)),
        sortOrder: unpostedSortColumn === 'resId' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('resId');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
        render: (value: string, record: any, idx: number) => {
          // Remove UsersIcon from 5th, 6th, 7th row
          const showUsersIcon = !['4', '5', '6'].includes(record.key);
          // Add prepaid icon for first row
          if (idx === 0) {
            return (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{value}</span>
                <Tooltip title="Prepaid">
                  <img src={PrepaidIcon} alt="Prepaid" style={{ width: 16, height: 16, marginLeft: 8 }} />
                </Tooltip>
              </span>
            );
          }
          return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>{value}</span>
              {showUsersIcon && false && (
                <Tooltip title="Group Name">
                  <InfoCircleFilled style={{ color: '#3E4BE0' }} />
                </Tooltip>
              )}
            </div>
          );
        },
      };
      const checkInCol = {
        ...columns[1],
        fixed: 'left' as 'left',
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.checkIn.split('\n')[0]);
          const dateB = new Date(b.checkIn.split('\n')[0]);
          return dateA.getTime() - dateB.getTime();
        },
        sortOrder: unpostedSortColumn === 'checkIn' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('checkIn');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
      };
      const checkOutCol = {
        ...columns[2],
        fixed: 'left' as 'left',
        sorter: (a: any, b: any) => {
          const dateA = new Date(a.checkOut.split('\n')[0]);
          const dateB = new Date(b.checkOut.split('\n')[0]);
          return dateA.getTime() - dateB.getTime();
        },
        sortOrder: unpostedSortColumn === 'checkOut' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('checkOut');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
      };
      const pocCol = {
        ...columns[3],
        fixed: 'left' as 'left',
        sorter: (a: any, b: any) => {
          const nameA = a.poc?.props?.children?.[0] || '';
          const nameB = b.poc?.props?.children?.[0] || '';
          return String(nameA).localeCompare(String(nameB));
        },
        sortOrder: unpostedSortColumn === 'poc' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('poc');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
      };
      // Status column (always TagUnconfirmed)
      const statusCol = {
        title: 'Status',
        dataIndex: 'reservation',
        key: 'reservation',
        width: 160, // keep as is or adjust if needed
        render: () => <img src={TagUnconfirmed} alt="Unconfirmed" style={{ height: 22 }} />, // Always TagUnconfirmed
        sorter: undefined,
        fixed: undefined,
        sortOrder: undefined,
        onHeaderCell: undefined,
      };
      // No. of Rooms column
      const noOfRoomsCol = {
        title: 'No. of Rooms',
        key: 'roomName',
        dataIndex: 'roomName',
        width: 160,
        render: (_: any, record: any, idx: number) => {
          // Custom tooltips for specific cells
          let tooltip = '';
          if (idx === 1) tooltip = 'KNS (1)';
          else if (idx === 3) tooltip = 'QNS (1)';
          else if (idx === 5) tooltip = 'STD (1)';
          else {
            const tooltips = [
              'STD (2)',
              'Meeting Hall (1)',
              'STD (1)',
              'Conference Hall (1)',
              'STD (2), KNS (3), QNS (2)',
              'Wedding Hall (1)',
              'STD (2), KNS (3), QNS (2), VILLA (4)'
            ];
            tooltip = tooltips[idx % tooltips.length];
          }
          return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>{courtesyDataRaw[idx]?.roomName}</span>
              <Tooltip title={tooltip} placement="left">
                <img src={InfoIcon} alt="Info" style={{ width: 16, height: 16, marginLeft: 8, cursor: 'pointer', verticalAlign: 'middle' }} />
              </Tooltip>
            </div>
          );
        },
        sorter: (a: any, b: any) => {
          // Find the courtesyDataRaw entry for each row by key
          const rowA = courtesyDataRaw.find(row => row.key === a.key);
          const rowB = courtesyDataRaw.find(row => row.key === b.key);
          const valA = Number(rowA?.roomName) || 0;
          const valB = Number(rowB?.roomName) || 0;
          return valA - valB;
        },
        sortOrder: unpostedSortColumn === 'roomName' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('roomName');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
      };
      // Total Charges column
      const totalChargesCol = {
        ...columns[7],
        width: 180, // Increased width to prevent overlap
        sorter: (a: any, b: any) => parseFloat(a.totalCharges) - parseFloat(b.totalCharges),
        sortOrder: unpostedSortColumn === 'totalCharges' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('totalCharges');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
      };
      // Balance column
      const balanceCol = {
        ...columns[8],
        sorter: (a: any, b: any) => parseFloat(a.balance) - parseFloat(b.balance),
        sortOrder: unpostedSortColumn === 'balance' ? unpostedSortOrder : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            setUnpostedSortColumn('balance');
            setUnpostedSortOrder(prev => (prev === 'ascend' ? 'descend' : 'ascend'));
          },
        }),
      };
      // Business Source column (plain text for first 7 rows)
      const businessSourceCol = {
        ...columns[9],
        render: (value: any, record: any, idx: number) => {
          // Custom Expedia + code for 4th row (idx === 3), no icons
          if (idx === 3 && typeof value === 'string' && value.toLowerCase().includes('expedia')) {
            // Extract Expedia and code
            const match = value.match(/(Expedia)\n(\d+)/i);
            if (match) {
              const [, name, code] = match;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100%', minHeight: 48 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, color: 'rgba(0,0,0,0.88)', lineHeight: '22px' }}>{name}</div>
                  <div style={{ color: '#888', fontSize: 15, lineHeight: '20px', marginTop: 2 }}>{code}</div>
                </div>
              );
            }
          }
          // ... existing code for other rows ...
          return value;
        },
        sorter: undefined,
        sortOrder: undefined,
        onHeaderCell: undefined,
      };
      // Unposted Reason column
      const unpostedReasonCol = {
        title: 'Unposted Reason',
        key: 'unpostedReason',
        dataIndex: 'unpostedReason',
        width: 220,
        render: (_: any, __: any, idx: number) => {
          const reasons = [
            'Overbooking/Insufficient Inventory',
            'Restrictions',
            'Error in Rental Update',
            'Room Type Mapping Issues',
            'Corrupted XML File',
            'Overbooking/Insufficient Inventory',
            'Room Type Mapping Issues',
          ];
          return reasons[idx] || '';
        },
        sorter: undefined,
      };
      // Actions column for Unposted Reservations
      const actionsCol = {
        title: '',
        key: 'actions',
        fixed: 'right' as 'right',
        width: 64,
        render: (_: any, record: any) => {
          return (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="transferout" onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'transferout', key: record.key }); }}>
                    Transfer Out Reservation
                  </Menu.Item>
                  <Menu.Item key="cancel" danger onClick={e => { e.domEvent.stopPropagation(); setActiveActionModal({ type: 'cancel', key: record.key }); }}>
                    Cancel Reservation
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
              placement="bottomRight"
              arrow
              getPopupContainer={() => document.body}
            >
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  outline: 'none',
                  transition: 'background 0.2s',
                }}
                onClick={e => { e.stopPropagation(); }}
                onMouseDown={e => { e.stopPropagation(); }}
                onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px #3E4BE033')}
                onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                onMouseOver={e => (e.currentTarget.style.background = '#f5f5f5')}
                onMouseOut={e => (e.currentTarget.style.background = 'none')}
              >
                <img src={ActionMenuIcon} alt="Action" style={{ width: 24, height: 24, opacity: 0.7 }} />
              </button>
            </Dropdown>
          );
        },
      };
      // Compose columns in the required order
      const colMap: Record<string, any> = {
        reservation: statusCol,
        roomName: noOfRoomsCol,
        totalCharges: totalChargesCol,
        balance: balanceCol,
        businessSource: businessSourceCol,
        unpostedReason: unpostedReasonCol,
      };
      // Always include the frozen columns at the start
      const baseCols = [crsIdCol, checkInCol, checkOutCol, pocCol];
      // Only allow the permitted columns for Unposted Reservations
      const allowedKeys = ['reservation', 'roomName', 'totalCharges', 'balance', 'businessSource', 'unpostedReason'];
      const dynamicCols = visibleCols
        .filter(key => allowedKeys.includes(key))
        .map(key => colMap[key])
        .filter(Boolean);
      // Add the actions column at the end
      return [...baseCols, ...dynamicCols, actionsCol];
    }
    // All Reservations tab
    return finalColumns;
  }

  // Update search logic for Unposted Reservations tab
  React.useEffect(() => {
    if (activeTab === '3') {
      if (searchText.trim()) {
        const lower = searchText.trim().toLowerCase();
        const filtered = data.slice(0, 7).filter(row => {
          const pocName = row.poc?.props?.children?.[0] || '';
          const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
          return (
            row.resId.toLowerCase().includes(lower) ||
            (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
            (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower))
          );
        });
        setFilteredDataUnposted(filtered);
      } else {
        setFilteredDataUnposted(data.slice(0, 7));
      }
    }
  }, [searchText, activeTab]);

  // Helper to always get columns as array
  function getTabColumnsArray(tabKey: string) {
    const cols = getTabColumns(tabKey);
    if (!Array.isArray(cols)) return [];
    // Flatten columns if any are arrays (e.g., column groups)
    return cols.flat ? cols.flat() : cols;
  }

  // Apply sorting to filteredDataUnposted
  const sortedUnpostedData = React.useMemo(() => {
    if (!unpostedSortColumn || !unpostedSortOrder) return filteredDataUnposted;
    // Get the column definition for the sorter
    const cols = getTabColumnsArray('3');
    const col = cols.find((c: any) => c && c.key === unpostedSortColumn);
    if (!col || !col.sorter) return filteredDataUnposted;
    const sorted = [...filteredDataUnposted].sort((a, b) => (col.sorter as any)(a, b));
    if (unpostedSortOrder === 'descend') sorted.reverse();
    return sorted;
  }, [filteredDataUnposted, unpostedSortColumn, unpostedSortOrder]);

  // Add new state for filtered data in each tab
  const [filteredAllReservationsData, setFilteredAllReservationsData] = useState(updatedData);
  const [filteredCourtesyData, setFilteredCourtesyData] = useState(courtesyDataRaw);

  // Compute the final data for each tab, combining filter-drawer and search/toggle filters
  const finalAllReservationsData = React.useMemo(() => {
    let data: any[] = filteredAllReservationsData;
    // Room/Space toggles
    if (!showRooms && !showSpaces) return [];
    if (showRooms && !showSpaces) data = data.filter(row => row.type === 'Room');
    if (!showRooms && showSpaces) data = data.filter(row => row.type === 'Space');
    // Search
    if (searchText.trim()) {
      const lower = searchText.trim().toLowerCase();
      data = data.filter((row: any) => {
        const pocName = row.poc?.props?.children?.[0] || '';
        const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
        return (
          row.resId.toLowerCase().includes(lower) ||
          (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
          (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower)) ||
          (row.roomName && row.roomName.toLowerCase().includes(lower))
        );
      });
    }
    return data;
  }, [filteredAllReservationsData, showRooms, showSpaces, searchText]);

  const finalCourtesyData = React.useMemo(() => {
    let data: any[] = filteredCourtesyData;
    // Room/Space toggles
    if (!showRooms && !showSpaces) return [];
    if (showRooms && !showSpaces) data = data.filter(row => row.type === 'Room');
    if (!showRooms && showSpaces) data = data.filter(row => row.type === 'Space');
    // Search
    if (searchTextCourtesy.trim()) {
      const lower = searchTextCourtesy.trim().toLowerCase();
      data = data.filter((row: any) => {
        const pocName = row.poc?.props?.children?.[0] || '';
        const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
        return (
          (row.holdId && row.holdId.toLowerCase().includes(lower)) ||
          (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
          (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower))
        );
      });
    }
    return data;
  }, [filteredCourtesyData, showRooms, showSpaces, searchTextCourtesy]);

  const finalUnpostedData = React.useMemo(() => {
    let data: any[] = filteredDataUnposted;
    if (searchText.trim()) {
      const lower = searchText.trim().toLowerCase();
      data = data.filter((row: any) => {
        const pocName = row.poc?.props?.children?.[0] || '';
        const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
        return (
          row.resId.toLowerCase().includes(lower) ||
          (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
          (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower))
        );
      });
    }
    return data;
  }, [filteredDataUnposted, searchText]);

  // Helper to get/set the correct filter state for the active tab
  const getFilters = () => (activeTab === '1' ? filtersAll : activeTab === '2' ? filtersCourtesy : filtersUnposted);
  const setFiltersForTab = (filters: any) => {
    if (activeTab === '1') setFiltersAll(filters);
    else if (activeTab === '2') setFiltersCourtesy(filters);
    else setFiltersUnposted(filters);
  };
  const getPendingFilters = () => (activeTab === '1' ? pendingFiltersAll : activeTab === '2' ? pendingFiltersCourtesy : pendingFiltersUnposted);
  const setPendingFiltersForTab = (filters: any) => {
    if (activeTab === '1') setPendingFiltersAll(filters);
    else if (activeTab === '2') setPendingFiltersCourtesy(filters);
    else setPendingFiltersUnposted(filters);
  };

  // On tab change, reset pending filters to the applied filters for that tab
  useEffect(() => {
    setPendingFiltersForTab(getFilters());
  }, [activeTab]);

  // Add this after finalUnpostedData
  const finalInHouseData = React.useMemo(() => {
    // Filter data for In-House status
    return finalAllReservationsData.filter(row => {
      let status = '';
      if (typeof row.reservation === 'string') {
        status = row.reservation;
      } else if (row.reservation?.props?.children) {
        const children = row.reservation.props.children;
        status = typeof children === 'string' ? children : (children[1] || '').props?.children || '';
      }
      return status.toLowerCase().includes('in-house');
    });
  }, [finalAllReservationsData]);

  // Just before the return statement in ManageReservations, add:
  const tabItems = [
    { key: '1', label: `All Reservations (${finalAllReservationsData.length})`, children: null },
    { key: '2', label: `Arrivals (${finalCourtesyData.length})`, children: null },
    { key: '3', label: `Departures (${finalUnpostedData.length})`, children: null },
    { key: '4', label: `In-House (${finalInHouseData.length})`, children: null },
  ];

  // Define dummy columns and data for the Arrivals tab
  const dummyColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const dummyData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '60px', display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f6fa', overflow: 'hidden' }}>
        <HeaderBar />
        <div style={{ padding: 40, height: '100%', boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
        <div className="main-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <div className="content-container" style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'auto', padding: 24, background: '#FFFFFF' }}>
            <h1 className="batch-folio-heading" style={{ marginBottom: 24 }}>Manage Reservations</h1>
              {/* Tabs and global switches in the same row, with full-width bottom border */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, borderBottom: '1px solid #E0E0E0', paddingBottom: 0 }}>
                <Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} tabBarStyle={{ borderBottom: 'none', marginBottom: 0 }} />
                {activeTab !== '3' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 500, fontSize: 16 }}>Rooms</span>
                      <Switch style={{ marginRight: 8 }} defaultChecked checked={showRooms} onChange={setShowRooms} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 500, fontSize: 16 }}>Spaces</span>
                      <Switch defaultChecked checked={showSpaces} onChange={setShowSpaces} />
                    </div>
                  </div>
                )}
              </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
              {activeTab === '1' && (
                <div style={{ position: 'relative', width: 400 }}>
                  <Input.Search
                    ref={searchInputRef}
                    placeholder="Search for Res ID., POC, room/space name"
                    enterButton={<SearchOutlined />}
                    style={{ maxWidth: 400, height: 40 }}
                    className="batch-folio-toolbar"
                    value={searchText}
                    onChange={e => {
                      const value = e.target.value;
                      setSearchText(value);
                      if (activeTab === '1') {
                        if (value.trim()) {
                          const lower = value.trim().toLowerCase();
                          const filtered = data.filter(row => {
                            const pocName = row.poc?.props?.children?.[0] || '';
                            const pocEmail = row.poc?.props?.children?.[2]?.props?.children || '';
                            return (
                              row.resId.toLowerCase().includes(lower) ||
                              (typeof pocName === 'string' && pocName.toLowerCase().includes(lower)) ||
                              (typeof pocEmail === 'string' && pocEmail.toLowerCase().includes(lower)) ||
                              (row.roomName && row.roomName.toLowerCase().includes(lower))
                            );
                          });
                          setFilteredData(filtered);
                        } else {
                          setFilteredData(data);
                        }
                      }
                    }}
                    onSearch={handleSearch}
                  />
                </div>
              )}
              {activeTab === '2' && (
                <div style={{ position: 'relative', width: 400 }}>
                  <Input.Search
                      placeholder="Search for Hold ID, POC"
                    enterButton={<SearchOutlined />}
                    style={{ maxWidth: 400, height: 40 }}
                    className="batch-folio-toolbar"
                    value={searchTextCourtesy}
                    onChange={e => {
                      const value = e.target.value;
                      setSearchTextCourtesy(value);
                    }}
                    onSearch={value => {
                      setSearchTextCourtesy(value);
                    }}
                  />
                </div>
              )}
                {activeTab === '3' && (
                  <div style={{ position: 'relative', width: 400 }}>
                    <Input.Search
                      placeholder="Search for CRS ID, POC"
                      enterButton={<SearchOutlined />}
                      style={{ maxWidth: 400, height: 40 }}
                      className="batch-folio-toolbar"
                      value={searchText}
                      onChange={e => setSearchText(e.target.value)}
                      onSearch={value => setSearchText(value)}
                  />
                </div>
              )}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center', height: 40 }}>
                <Button
                  type="default"
                  style={isAnyFilterActive ? activeButtonStyle : iconButtonStyle}
                  className="icon-button"
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  <FunnelIcon style={isAnyFilterActive ? activeIconStyle : iconStyle} />
                </Button>
                <Dropdown
                  overlay={<CustomizeColumnsDropdown />}
                  trigger={["click"]}
                  open={customizeOpen}
                  onOpenChange={setCustomizeOpen}
                  placement="bottomRight"
                  arrow
                >
                  <Button
                    type="default"
                    style={(() => {
                      let columnsState = allReservationsCustomColumns;
                      if (activeTab === '2') columnsState = courtesyCustomColumnsState;
                      if (activeTab === '3') columnsState = unpostedCustomColumns;
                      const anyUnchecked = columnsState.some(col => !col.visible);
                      return anyUnchecked ? activeButtonStyle : iconButtonStyle;
                    })()}
                    className="icon-button"
                  >
                    {(() => {
                      let columnsState = allReservationsCustomColumns;
                      if (activeTab === '2') columnsState = courtesyCustomColumnsState;
                      if (activeTab === '3') columnsState = unpostedCustomColumns;
                      const anyUnchecked = columnsState.some(col => !col.visible);
                      return anyUnchecked ? (
                    <CustomColumnIcon style={iconStyle} />
                      ) : (
                        <CustomColumnIcon style={iconStyle} />
                      );
                    })()}
                  </Button>
                </Dropdown>
                <Button
                  type="primary"
                  style={{
                    background: selectedRowKeys.length === 0 ? '#E0E0E0' : '#3E4BE0',
                    color: selectedRowKeys.length === 0 ? '#A0A0A0' : '#fff',
                    border: 'none',
                    borderRadius: 8,
                    height: 40,
                    minHeight: 40,
                    minWidth: 120,
                    padding: '0 20px',
                    fontWeight: 600,
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 2px 8px 0 rgba(62,75,224,0.15)',
                    cursor: selectedRowKeys.length === 0 ? 'not-allowed' : 'pointer',
                  }}
                  icon={<img src={ExportIcon} alt="Export" style={{ width: 24, height: 24, filter: selectedRowKeys.length === 0 ? 'grayscale(1) brightness(0.7)' : 'none' }} />}
                  disabled={selectedRowKeys.length === 0}
                >
                  Export
                </Button>
              </div>
            </div>
              {/* Unposted Reservations Alert (below search+buttons row) */}
              {activeTab === '3' && (
                <div style={{ marginTop: 24, marginBottom: 0, width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      background: '#F1F6FF',
                      border: '1px solid #ACC4FD',
                      borderRadius: 8,
                      padding: '8px 12px',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <img src={require('../assets/Icons/circle-info.svg').default} alt="Info" style={{ width: 24, height: 24, marginRight: 8, marginTop: 2, flexShrink: 0, color: '#3E4BE0' }} />
                    <span style={{ fontWeight: 400, fontSize: 14, color: 'rgba(0,0,0,0.88)', lineHeight: '24px' }}>
                      Reservations that remain un-posted can be updated by checking the reservation details and confirming the OTA mapping. They may also be cancelled or transferred out from this section.
                    </span>
                  </div>
                </div>
              )}
            <div style={{ marginTop: 24 }}>
              {activeTab === '2' ? (
                <Table
                  rowSelection={rowSelection}
                  columns={courtesyColumns}
                  dataSource={filteredDataCourtesySorted}
                  scroll={{ x: 1500, y: 480 }}
                  pagination={false}
                  className="custom-table-borders"
                />
              ) : (
                <Table
                  rowSelection={rowSelection}
                  columns={getTabColumnsArray(activeTab)}
                  dataSource={
                    activeTab === '1' ? pagedData :
                    activeTab === '3' ? sortedUnpostedData :
                    []
                  }
                  scroll={{ x: 1500, y: 480 }}
                  pagination={false}
                  className="custom-table-borders"
                />
              )}
            </div>
            {activeTab === '1' && <div style={{ height: 16 }} />}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 0' }}>
              <div style={{ flex: 1, textAlign: 'left', color: 'rgba(0,0,0,0.88)', fontSize: 14 }}>
                  {activeTab === '2' ? 'Total 7 results' : activeTab === '3' ? 'Total 7 results' : `Total ${data.length} results`}
              </div>
              <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                  {activeTab === '1' && (
                <Pagination
                  current={current}
                  total={data.length}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  onChange={(page) => setCurrent(page)}
                  style={{ margin: 0 }}
                />
                  )}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  {/* Always show the page size selector, even in Courtesy Holds tab */}
                <Pagination
                  pageSize={pageSize}
                    total={activeTab === '2' ? 7 : activeTab === '3' ? 7 : data.length}
                  current={current}
                  showSizeChanger
                  showQuickJumper={false}
                  showTotal={undefined}
                  pageSizeOptions={['10', '20', '30', '40']}
                  onShowSizeChange={(_, size) => setPageSize(size)}
                  onChange={(page) => setCurrent(page)}
                  style={{ minWidth: 120, margin: 0 }}
                  itemRender={() => null}
                />
              </div>
            </div>
            <Drawer
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 18 }}>Filters</span>
                  <Button
                    type="default"
                    icon={<img src={EraserIcon} alt="Clear All" style={{ width: 18, height: 18, verticalAlign: 'middle', filter: !isAnyFilterActive ? 'opacity(0.45)' : 'opacity(0.88)' }} />}
                    disabled={!isAnyFilterActive}
                    onClick={() => {
                      setPendingFiltersForTab(getFilters());
                      setFiltersForTab({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
                      setFilteredData(data);
                    }}
                    style={{ fontWeight: 500, fontSize: 14, color: isAnyFilterActive ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    Clear All
                  </Button>
                </div>
              }
              placement="right"
              width={360}
              onClose={() => setFilterDrawerOpen(false)}
              open={filterDrawerOpen}
              bodyStyle={{ padding: 24 }}
              footer={
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                  <Button type="text" onClick={() => {
                    if (isAnyFilterActive) {
                      setShowCancelModal(true);
                    } else {
                      setFilterDrawerOpen(false);
                    }
                  }} style={{ fontWeight: 500, fontSize: 16 }}>Cancel</Button>
                  <Button
                    type="primary"
                    disabled={!isAnyFilterActive}
                    style={{ fontWeight: 500, fontSize: 16 }}
                    onClick={() => {
                      setFiltersForTab(getPendingFilters());
                      if (activeTab === '1') {
                        let filtered = updatedData;
                        // 1. Check-In - Check-Out Dates (AND logic)
                        if (pendingFiltersAll.dateRange) {
                          const [start, end] = pendingFiltersAll.dateRange;
                        filtered = filtered.filter(row => {
                          const checkInDate = row.checkIn.split('\n')[0];
                            const checkOutDate = row.checkOut.split('\n')[0];
                          const checkInDayjs = dayjs(checkInDate);
                            const checkOutDayjs = dayjs(checkOutDate);
                          return (
                            checkInDayjs.isSameOrAfter(start, 'day') &&
                              checkOutDayjs.isSameOrBefore(end, 'day')
                          );
                        });
                      }
                        // 2. Status (AND logic)
                        if (pendingFiltersAll.status.length) {
                          // Map status filter values to the tag SVGs used in the table
                          const statusToTag = {
                            'In-House': 'TagInhouse.svg',
                            'Cancelled': 'TagCancelled.svg',
                            'No Show': 'TagNo-Show.svg',
                            'Checked-Out': 'TagCheckedout.svg',
                            'Unconfirmed': 'TagUnconfirmed.svg',
                            'Confirmed': 'TagConfirmed.svg',
                            'Transfer Out': 'TagTransfer Out.svg',
                          };
                        filtered = filtered.filter(row => {
                            let tagFile = '';
                            // Determine which tag SVG is rendered for this row
                            if (row.reservation && row.reservation.type === 'img' && row.reservation.props && row.reservation.props.src) {
                              // If reservation is an <img> (shouldn't be, but fallback)
                              tagFile = row.reservation.props.src.split('/').pop();
                            } else if (row.reservation?.props?.children) {
                              // The render logic in the Status column uses Tag SVGs based on status string
                              let status = '';
                              const children = row.reservation.props.children;
                              if (Array.isArray(children)) {
                                status = children.find(child => typeof child === 'string' && child.trim() && !/^[\u1F300-\u1F6FF\u2600-\u26FF\u2700-\u27BF]+$/.test(child.trim()));
                                if (!status && children.length > 1 && typeof children[1] === 'string') {
                                  status = children[1];
                                }
                              } else if (typeof children === 'string') {
                                status = children;
                              }
                              status = status.trim();
                              // Map status string to tag SVG filename
                              if (status.toLowerCase().includes('in-house')) tagFile = 'TagInhouse.svg';
                              else if (status.toLowerCase().includes('cancelled')) tagFile = 'TagCancelled.svg';
                              else if (status.toLowerCase().includes('no show')) tagFile = 'TagNo-Show.svg';
                              else if (status.toLowerCase().includes('checked-out')) tagFile = 'TagCheckedout.svg';
                              else if (status.toLowerCase().includes('unconfirmed')) tagFile = 'TagUnconfirmed.svg';
                              else if (status.toLowerCase().includes('confirmed')) tagFile = 'TagConfirmed.svg';
                              else if (status.toLowerCase().includes('transfer out')) tagFile = 'TagTransfer Out.svg';
                            }
                            // Now, check if any selected status maps to this tagFile
                            return pendingFiltersAll.status.some((selectedStatus: string) => statusToTag[selectedStatus as keyof typeof statusToTag] === tagFile);
                          });
                        }
                        // 3. Room/Space Type (AND logic)
                        if (pendingFiltersAll.roomType.length) {
                          filtered = filtered.filter(row => pendingFiltersAll.roomType.includes(row.roomType));
                        }
                        // 4. Business Source (AND logic)
                        if (pendingFiltersAll.businessSource.length) {
                        filtered = filtered.filter(row => {
                          let bs = row.businessSource;
                            if (typeof bs === 'object' && bs !== null && 'props' in bs) bs = bs.props?.children?.[0] || '';
                            if (typeof bs !== 'string') bs = '';
                            return pendingFiltersAll.businessSource.includes(bs);
                          });
                        }
                        // 5. Cancellation Policy (AND logic)
                        if ((pendingFiltersAll.cancellationPolicy || []).length) {
                          filtered = filtered.filter(row => pendingFiltersAll.cancellationPolicy.includes(row.cancellationPolicy));
                        }
                        setFilteredAllReservationsData(filtered);
                      } else if (activeTab === '2') {
                        let filtered = courtesyDataRaw;
                        // 1. Date Range
                        if (pendingFiltersCourtesy.dateRange) {
                          const [start, end] = pendingFiltersCourtesy.dateRange;
                        filtered = filtered.filter(row => {
                            const checkInDate = row.checkIn.split('\n')[0];
                            const checkInDayjs = dayjs(checkInDate);
                            return (
                              checkInDayjs.isSameOrAfter(start, 'day') &&
                              checkInDayjs.isSameOrBefore(end, 'day')
                            );
                          });
                        }
                        // 2. Status (AND logic, match by tag SVG)
                        if (pendingFiltersCourtesy.status.length) {
                          const statusToTag = {
                            'Unconfirmed': 'TagUnconfirmed.svg',
                            'Confirmed': 'TagConfirmed.svg',
                          };
                          filtered = filtered.filter(row => {
                            let tagFile = '';
                            // Extract the tag SVG filename from the reservation field
                            if (row.reservation && typeof row.reservation === 'object' && row.reservation.props && row.reservation.props.children) {
                              const children = row.reservation.props.children;
                              if (Array.isArray(children) && children[0]?.props?.src) {
                                const src = children[0].props.src;
                                tagFile = typeof src === 'string' ? src.split('/').pop() || '' : '';
                              }
                            }
                            return pendingFiltersCourtesy.status.some((selectedStatus: string) => statusToTag[selectedStatus as keyof typeof statusToTag] === tagFile);
                          });
                        }
                        // 3. Room Type
                        if (pendingFiltersCourtesy.roomType.length) {
                          filtered = filtered.filter(row => pendingFiltersCourtesy.roomType.includes(row.roomType));
                        }
                        // 4. Business Source (AND logic)
                        if (pendingFiltersCourtesy.businessSource.length) {
                          filtered = filtered.filter(row => {
                            let bs: any = row.businessSource;
                            if (typeof bs === 'object' && bs !== null && 'props' in bs) bs = bs.props?.children?.[0] || '';
                            return pendingFiltersCourtesy.businessSource.some((s: any) => typeof bs === 'string' && bs.toLowerCase().includes(s.toLowerCase()));
                          });
                        }
                        // 5. Cancellation Policy (AND logic)
                        if ((pendingFiltersCourtesy.cancellationPolicy || []).length) {
                          filtered = filtered.filter(row => pendingFiltersCourtesy.cancellationPolicy.includes(row.cancellationPolicy));
                        }
                        setFilteredCourtesyData(filtered);
                      } else if (activeTab === '3') {
                        let filtered = data.slice(0, 7);
                        if (pendingFiltersUnposted.dateRange) {
                          const [start, end] = pendingFiltersUnposted.dateRange;
                          filtered = filtered.filter(row => {
                            const checkInDate = row.checkIn.split('\n')[0];
                            const checkInDayjs = dayjs(checkInDate);
                            return (
                              checkInDayjs.isSameOrAfter(start, 'day') &&
                              checkInDayjs.isSameOrBefore(end, 'day')
                            );
                          });
                        }
                        if (pendingFiltersUnposted.status.length) {
                          filtered = filtered.filter(row => {
                            const status = (row.reservation?.props?.children || '').toString();
                            return pendingFiltersUnposted.status.some((s: any) => typeof status === 'string' && status.toLowerCase().includes(s.toLowerCase()));
                          });
                        }
                        if (pendingFiltersUnposted.roomType.length) {
                          filtered = filtered.filter(row => pendingFiltersUnposted.roomType.includes(row.roomType));
                        }
                        if (pendingFiltersUnposted.businessSource.length) {
                          filtered = filtered.filter(row => {
                            let bs: any = row.businessSource;
                            if (typeof bs === 'object' && bs !== null && 'props' in bs) bs = bs.props?.children?.[0] || '';
                            return pendingFiltersUnposted.businessSource.some((s: any) => typeof bs === 'string' && bs.toLowerCase().includes(s.toLowerCase()));
                          });
                        }
                        if ((pendingFiltersUnposted.cancellationPolicy || []).length) {
                        filtered = filtered.filter(row =>
                            (pendingFiltersUnposted.cancellationPolicy as any).some((s: any) => (pendingFiltersUnposted.cancellationPolicy || []).includes(row.cancellationPolicy))
                        );
                      }
                        setFilteredDataUnposted(filtered);
                      }
                      setFilterDrawerOpen(false);
                    }}
                  >
                    {`Show ${isAnyFilterActive ? (
                      activeTab === '1'
                        ? (pendingFiltersAll.loyaltyStatus && pendingFiltersAll.loyaltyStatus.length
                          ? updatedData.filter(row => typeof row.businessSource === 'object' && row.businessSource !== null && 'props' in row.businessSource && Array.isArray(row.businessSource.props.children) && row.businessSource.props.children.some((child: any) => child && child.props && child.props.src && typeof child.props.src === 'string' && child.props.src.includes('loyaltyprogram.svg'))).length
                          : getFilteredCount())
                        : activeTab === '2'
                          ? (() => {
                              let filtered = courtesyDataRaw;
                              if (pendingFiltersCourtesy.dateRange) {
                                const [start, end] = pendingFiltersCourtesy.dateRange;
                                filtered = filtered.filter(row => {
                                  const checkInDate = row.checkIn.split('\n')[0];
                                  const checkInDayjs = dayjs(checkInDate);
                                  return (
                                    checkInDayjs.isSameOrAfter(start, 'day') &&
                                    checkInDayjs.isSameOrBefore(end, 'day')
                                  );
                                });
                              }
                              if (pendingFiltersCourtesy.status.length) {
                                const statusToTag = {
                                  'Unconfirmed': 'TagUnconfirmed.svg',
                                  'Confirmed': 'TagConfirmed.svg',
                                };
                                filtered = filtered.filter(row => {
                                  let tagFile = '';
                                  if (row.reservation && typeof row.reservation === 'object' && row.reservation.props && row.reservation.props.children) {
                                    const children = row.reservation.props.children;
                                    if (Array.isArray(children) && children[0]?.props?.src) {
                                      const src = children[0].props.src;
                                      tagFile = typeof src === 'string' ? src.split('/').pop() || '' : '';
                                    }
                                  }
                                  return pendingFiltersCourtesy.status.some((selectedStatus: string) => statusToTag[selectedStatus as keyof typeof statusToTag] === tagFile);
                                });
                              }
                              if (pendingFiltersCourtesy.roomType.length) {
                                filtered = filtered.filter(row => pendingFiltersCourtesy.roomType.includes(row.roomType));
                              }
                              if (pendingFiltersCourtesy.businessSource.length) {
                                filtered = filtered.filter(row => {
                                  let bs: any = row.businessSource;
                                  if (typeof bs === 'object' && bs !== null && 'props' in bs) bs = bs.props?.children?.[0] || '';
                                  return pendingFiltersCourtesy.businessSource.some((s: any) => typeof bs === 'string' && bs.toLowerCase().includes(s.toLowerCase()));
                                });
                              }
                              if ((pendingFiltersCourtesy.cancellationPolicy || []).length) {
                                filtered = filtered.filter(row => pendingFiltersCourtesy.cancellationPolicy.includes(row.cancellationPolicy));
                              }
                              return filtered.length;
                            })()
                          : activeTab === '3'
                            ? (() => {
                                let filtered = data.slice(0, 7);
                                if (pendingFiltersUnposted.dateRange) {
                                  const [start, end] = pendingFiltersUnposted.dateRange;
                                  filtered = filtered.filter(row => {
                                    const checkInDate = row.checkIn.split('\n')[0];
                                    const checkInDayjs = dayjs(checkInDate);
                                    return (
                                      checkInDayjs.isSameOrAfter(start, 'day') &&
                                      checkInDayjs.isSameOrBefore(end, 'day')
                                    );
                                  });
                                }
                                if (pendingFiltersUnposted.status.length) {
                                  filtered = filtered.filter(row => {
                                    const status = (row.reservation?.props?.children || '').toString();
                                    return pendingFiltersUnposted.status.some((s: any) => typeof status === 'string' && status.toLowerCase().includes(s.toLowerCase()));
                                  });
                                }
                                if (pendingFiltersUnposted.roomType.length) {
                                  filtered = filtered.filter(row => pendingFiltersUnposted.roomType.includes(row.roomType));
                                }
                                if (pendingFiltersUnposted.businessSource.length) {
                                  filtered = filtered.filter(row => {
                                    let bs: any = row.businessSource;
                                    if (typeof bs === 'object' && bs !== null && 'props' in bs) bs = bs.props?.children?.[0] || '';
                                    return pendingFiltersUnposted.businessSource.some((s: any) => typeof bs === 'string' && bs.toLowerCase().includes(s.toLowerCase()));
                                  });
                                }
                                if ((pendingFiltersUnposted.cancellationPolicy || []).length) {
                                  filtered = filtered.filter(row =>
                                    (pendingFiltersUnposted.cancellationPolicy as any).some((s: any) => (pendingFiltersUnposted.cancellationPolicy || []).includes(row.cancellationPolicy))
                                  );
                                }
                                return filtered.length;
                              })()
                            : 0
                      ) : 0} Results`}
                  </Button>
                </div>
              }
            >
              <Form layout="vertical">
                <Form.Item label="Check-In - Check-Out Dates" style={{ marginBottom: 16 }}>
                  <DatePicker.RangePicker
                    value={activeTab === '2' ? pendingFiltersCourtesy.dateRange : pendingFiltersAll.dateRange}
                    onChange={val => setPendingFiltersForTab((f: any) => ({ ...f, dateRange: val as [Dayjs, Dayjs] | null }))}
                    style={{ width: '100%' }}
                    allowClear
                  />
                </Form.Item>
                  {activeTab !== '3' && (
                <Form.Item label="Status" style={{ marginBottom: 16 }}>
                  <Select
                    mode="multiple"
                    value={activeTab === '2' ? pendingFiltersCourtesy.status : pendingFiltersAll.status}
                    onChange={val => setPendingFiltersForTab((f: any) => ({ ...f, status: val }))}
                    options={activeTab === '2' ? courtesyStatusOptions : statusOptions}
                    style={{ width: '100%' }}
                    placeholder="Select status"
                    allowClear
                  />
                </Form.Item>
                  )}
                  {activeTab !== '2' && activeTab !== '3' && (
                <Form.Item label="Room/Space Type" style={{ marginBottom: 16 }}>
                  <Select
                    mode="multiple"
                    value={pendingFiltersAll.roomType}
                    onChange={val => setPendingFiltersForTab((f: any) => ({ ...f, roomType: val }))}
                    options={roomTypeOptions}
                    style={{ width: '100%' }}
                    placeholder="Select room/space type"
                    allowClear
                  />
                </Form.Item>
                  )}
                <Form.Item label="Business Source" style={{ marginBottom: 16 }}>
                  <Select
                    mode="multiple"
                    value={activeTab === '2' ? pendingFiltersCourtesy.businessSource : activeTab === '3' ? pendingFiltersUnposted.businessSource : pendingFiltersAll.businessSource}
                    onChange={val => setPendingFiltersForTab((f: any) => ({ ...f, businessSource: val }))}
                    options={activeTab === '2' ? businessSourceOptionsCourtesy : activeTab === '3' ? businessSourceOptionsUnposted : businessSourceOptions}
                    style={{ width: '100%' }}
                    placeholder="Select business source"
                    allowClear
                  />
                </Form.Item>
                  {activeTab !== '3' && (
                <Form.Item label="Cancellation Policy" style={{ marginTop: 16, marginBottom: 0 }}>
                  <Select
                    mode="multiple"
                    value={activeTab === '2' ? pendingFiltersCourtesy.cancellationPolicy : pendingFiltersAll.cancellationPolicy || []}
                    onChange={val => setPendingFiltersForTab((f: any) => ({ ...f, cancellationPolicy: val }))}
                    options={cancellationPolicyOptions}
                    style={{ width: '100%' }}
                    placeholder="Select cancellation policy"
                    allowClear
                  />
                </Form.Item>
                  )}
                  {activeTab === '1' && (
                <Form.Item label="Loyalty Program" style={{ marginBottom: 16, marginTop: 16 }}>
                  <Select
                    mode="multiple"
                    value={pendingFiltersAll.loyaltyStatus}
                    onChange={val => setPendingFiltersForTab((f: any) => ({ ...f, loyaltyStatus: val }))}
                    options={loyaltyStatusOptions}
                    style={{ width: '100%' }}
                    placeholder="Select loyalty program"
                    allowClear
                  />
                </Form.Item>
                  )}
              </Form>
            </Drawer>
            <Modal
              open={showCancelModal}
              title={
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <InfoCircleFilled style={{ color: '#3E4BE0', fontSize: 20, marginTop: 2 }} />
                  <span>Cancel Reservation Filtration?</span>
                </span>
              }
              onCancel={() => setShowCancelModal(false)}
              centered
              footer={[
                <Button key="no" onClick={() => setShowCancelModal(false)}>
                  No, Keep Editing
                </Button>,
                <Button key="yes" type="primary" style={{ background: '#3E4BE0', borderColor: '#3E4BE0' }} onClick={() => {
                  setPendingFiltersForTab(getFilters());
                  setFiltersForTab({ dateRange: null, status: [], roomType: [], businessSource: [], loyaltyStatus: [], cancellationPolicy: [] });
                  setFilteredData(data);
                  setShowCancelModal(false);
                  setFilterDrawerOpen(false);
                }}>
                  Yes, Cancel
                </Button>
              ]}
            >
              Proceeding will erase newly entered data, and you will need to start over.
            </Modal>
            <Modal
              open={showCheckInModal}
                title={
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <InfoCircleFilled style={{ color: '#3E4BE0', fontSize: 20, marginTop: 2 }} />
                    <span>Check-In Guest(s?)</span>
                  </span>
                }
              centered
                onCancel={() => { setShowCheckInModal(false); }}
              footer={[
                  <Button key="no" onClick={() => { setShowCheckInModal(false); }}>No, Cancel</Button>,
                  <Button key="yes" type="primary" onClick={() => { setShowCheckInModal(false); }}>Yes, Check-In</Button>
              ]}
            >
              <span style={{ display: 'block', marginLeft: 28 }}>
                Proceeding will check in all the guests linked to this reservation. Please ensure all pre-check-in requirements are complete.
              </span>
            </Modal>
            <Modal
              open={!!activeActionModal && activeActionModal.type === 'noshow'}
              title={
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <InfoCircleFilled style={{ color: '#3E4BE0', fontSize: 20, marginTop: 2 }} />
                  <span>Mark as No-Show?</span>
                </span>
              }
              centered
              onCancel={() => setActiveActionModal(null)}
              footer={[
                <Button key="no" onClick={() => setActiveActionModal(null)}>No, Cancel</Button>,
                <Button key="yes" type="primary" onClick={() => setActiveActionModal(null)}>Yes, Mark as No-Show</Button>,
              ]}
            >
              <span style={{ display: 'block', marginLeft: 28 }}>
                Proceeding will mark this reservation as a no-show. This action cannot be undone and a new reservation would have to be made if the guest plans to book again.
              </span>
            </Modal>
            <Modal
              open={!!activeActionModal && activeActionModal.type === 'cancel'}
              title={
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <CancelModalIcon style={{ fontSize: 20, marginTop: 2 }} />
                  <span>Cancel Reservation?</span>
                </span>
              }
              centered
              onCancel={() => setActiveActionModal(null)}
              footer={[
                <Button key="close" onClick={() => setActiveActionModal(null)}>Close</Button>,
                <Button key="yes" type="primary" danger onClick={() => setActiveActionModal(null)}>Yes, Cancel Reservation</Button>,
              ]}
            >
              <span style={{ display: 'block', marginLeft: 28 }}>
                  Proceeding will cancel this reservation. This action cannot be undone and the inventory blocked will be released.
              </span>
            </Modal>
            <Modal
              open={!!activeActionModal && activeActionModal.type === 'transferout'}
              title={
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <InfoCircleFilled style={{ color: '#3E4BE0', fontSize: 20, marginTop: 2 }} />
                  <span>Transfer Out?</span>
                </span>
              }
              centered
              onCancel={() => setActiveActionModal(null)}
              footer={[
                <Button key="no" onClick={() => setActiveActionModal(null)}>No, Cancel</Button>,
                <Button key="yes" type="primary" onClick={() => setActiveActionModal(null)}>Yes, Transfer Out</Button>,
              ]}
            >
              <span style={{ display: 'block', marginLeft: 28 }}>
                Proceeding will transfer out this reservation from the property. This action cannot be undone.
              </span>
            </Modal>
            <Modal
              open={!!activeActionModal && activeActionModal.type === 'checkout'}
              title={
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <InfoCircleFilled style={{ color: '#3E4BE0', fontSize: 20, marginTop: 2 }} />
                  <span>Check-Out Guest(s)?</span>
                </span>
              }
              centered
              onCancel={() => setActiveActionModal(null)}
              footer={[
                <Button key="no" onClick={() => setActiveActionModal(null)}>No, Cancel</Button>,
                <Button key="yes" type="primary" onClick={() => setActiveActionModal(null)}>Yes, Check-Out</Button>,
              ]}
            >
              <span style={{ display: 'block', marginLeft: 28 }}>
                Proceeding will check out all the guests linked to this reservation. Please note that this reservation has pending dues. This action will update the reservation status to Checked-Out.
              </span>
            </Modal>
              <Modal
                open={!!activeActionModal && activeActionModal.type === 'convert'}
                title={
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <InfoCircleFilled style={{ color: '#3E4BE0', fontSize: 20, marginTop: 2 }} />
                    <span>Convert to Reservation?</span>
                  </span>
                }
                centered
                onCancel={() => setActiveActionModal(null)}
                footer={[
                  <Button key="no" onClick={() => setActiveActionModal(null)}>No, Cancel</Button>,
                  <Button key="yes" type="primary" onClick={() => setActiveActionModal(null)}>Yes, Convert to Reservation</Button>,
                ]}
              >
                <span style={{ display: 'block', marginLeft: 28 }}>
                  Proceeding will convert this courtesy hold into a confirmed reservation. This action cannot be undone and the guest will receive a confirmation email and standard cancellation policies will apply.
                </span>
              </Modal>
              <Modal
                open={!!activeActionModal && activeActionModal.type === 'cancel_courtesy'}
                title={
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CancelModalIcon style={{ fontSize: 20, marginTop: 2 }} />
                    <span>Cancel Courtesy Hold?</span>
                  </span>
                }
                centered
                onCancel={() => setActiveActionModal(null)}
                footer={[
                  <Button key="close" onClick={() => setActiveActionModal(null)}>Close</Button>,
                  <Button key="yes" type="primary" danger onClick={() => setActiveActionModal(null)}>Yes, Cancel Courtesy Hold</Button>,
                ]}
              >
                <span style={{ display: 'block', marginLeft: 28 }}>
                  Proceeding will cancel this courtesy hold. This action cannot be undone and the inventory blocked will be released.
              </span>
            </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReservations; 