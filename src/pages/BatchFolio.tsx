import React, { useState, useRef, useEffect } from 'react';
import './BatchFolio.css';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import { Input, Button, Table, Pagination, Select, Tooltip, Drawer, Form, DatePicker, Checkbox, Dropdown } from 'antd';
import { SearchOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { ReactComponent as ColumnsIcon } from '../assets/Icons/ColumnsIcon.svg';
import { ReactComponent as FunnelIcon } from '../assets/Icons/FunnelIcon.svg';
import { ReactComponent as CancelledIcon } from '../assets/Icons/Cancelled.svg';
import { ReactComponent as CheckedOutIcon } from '../assets/Icons/checked-out.svg';
import { ReactComponent as ConfirmedIcon } from '../assets/Icons/confirmed.svg';
import { ReactComponent as InHouseIcon } from '../assets/Icons/in-house.svg';
import { ReactComponent as NoShowIcon } from '../assets/Icons/no-show.svg';
import { ReactComponent as UnconfirmedIcon } from '../assets/Icons/unconfirmed.svg';
import { ReactComponent as TransferOutIcon } from '../assets/Icons/transfer out.svg';
import { ReactComponent as GroupIcon } from '../assets/Icons/GroupIcon.svg';
import dayjs from 'dayjs';
import update from 'immutability-helper';

const roomTypes = ['Deluxe', 'Suite', 'Standard', 'Executive', 'Superior'];
const roomTypeShortMap: Record<string, string> = {
  'Deluxe': 'DLX',
  'Suite': 'STE',
  'Standard': 'STD',
  'Executive': 'EXE',
  'Superior': 'SUP',
};
const businessSources = ['Booking.com', 'Expedia', 'Direct', 'Agoda', 'Hotels.com'];
const cancellationPolicies = ['Flexible', 'Non-refundable'];

const peopleNames = [
  'Olivia Smith', 'Liam Johnson', 'Emma Williams', 'Noah Brown', 'Ava Jones',
  'Sophia Garcia', 'Mason Miller', 'Isabella Davis', 'Lucas Rodriguez', 'Mia Martinez',
  'Charlotte Hernandez', 'Amelia Lopez', 'Elijah Gonzalez', 'Harper Wilson', 'Benjamin Anderson',
  'Evelyn Thomas', 'James Taylor', 'Abigail Moore', 'Henry Jackson', 'Emily Martin',
  'Alexander Lee', 'Elizabeth Perez', 'Sebastian Thompson', 'Ella White', 'Jack Harris',
  'Scarlett Clark', 'Daniel Lewis', 'Grace Robinson', 'Matthew Walker', 'Chloe Young',
  'David Allen', 'Penelope King', 'Joseph Wright', 'Layla Scott', 'Samuel Green',
  'Victoria Adams', 'Carter Baker', 'Lily Nelson', 'Owen Hill', 'Hannah Ramirez',
  'Wyatt Campbell', 'Aria Mitchell', 'John Carter', 'Sofia Roberts', 'Julian Evans',
  'Zoe Turner', 'Levi Phillips', 'Nora Parker', 'Isaac Collins', 'Riley Edwards'
];

const RESERVATION_STATUS_VALUES = [
  'Unconfirmed',
  'Confirmed',
  'Transfer Out',
  'Cancelled',
  'No Show',
  'Checked-Out',
  'In-House',
];

const generateData = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const idx = i + 1;
    const roomType = roomTypes[idx % roomTypes.length];
    return {
      key: String(idx),
      reservationId: `R12${300 + idx}`,
      pocFullName: peopleNames[(idx - 1) % peopleNames.length],
      checkInDate: `2024-06-${(idx % 28 + 1).toString().padStart(2, '0')}`,
      checkOutDate: `2024-06-${((idx + 2) % 28 + 1).toString().padStart(2, '0')}`,
      room: `${100 + (idx % 10)} (${roomTypeShortMap[roomType]})`,
      cancellationPolicy: cancellationPolicies[idx % cancellationPolicies.length],
      businessSource: businessSources[idx % businessSources.length],
      totalCharges: 800 + (idx * 37) % 2000,
      balance: (idx * 53) % 700,
      reservationStatus: RESERVATION_STATUS_VALUES[Math.floor(Math.random() * RESERVATION_STATUS_VALUES.length)],
    };
  });

// For group children, assign real names as well
const groupChildName = (i: number) => peopleNames[i % peopleNames.length];

const allDataNested: Record<string, any>[] = [
  ...generateData(5),
  {
    key: 'parent-1',
    reservationId: 'R12336',
    pocFullName: 'Standard Group',
    checkInDate: '2024-06-10',
    checkOutDate: '2024-06-15',
    room: `Multiple (${roomTypeShortMap['Standard']})`,
    cancellationPolicy: 'Flexible',
    businessSource: 'Direct',
    totalCharges: 5600,
    balance: 800,
    children: [
      { key: 'p1-c1', reservationId: 'R12337', pocFullName: groupChildName(0), checkInDate: '2024-06-10', checkOutDate: '2024-06-15', room: `301 (${roomTypeShortMap['Standard']})`, cancellationPolicy: 'Flexible', businessSource: 'Direct', totalCharges: 1120, balance: 160 },
      { key: 'p1-c2', reservationId: 'R12338', pocFullName: groupChildName(1), checkInDate: '2024-06-10', checkOutDate: '2024-06-15', room: `302 (${roomTypeShortMap['Standard']})`, cancellationPolicy: 'Flexible', businessSource: 'Direct', totalCharges: 1120, balance: 160 },
    ],
  },
  {
    key: 'parent-2',
    reservationId: 'R12339',
    pocFullName: 'Deluxe Group',
    checkInDate: '2024-06-16',
    checkOutDate: '2024-06-20',
    room: `Multiple (${roomTypeShortMap['Deluxe']})`,
    cancellationPolicy: 'Non-refundable',
    businessSource: 'Expedia',
    totalCharges: 7200,
    balance: 1200,
    children: [
      { key: 'p2-c1', reservationId: 'R12340', pocFullName: groupChildName(2), checkInDate: '2024-06-16', checkOutDate: '2024-06-20', room: `401 (${roomTypeShortMap['Deluxe']})`, cancellationPolicy: 'Non-refundable', businessSource: 'Expedia', totalCharges: 1800, balance: 300 },
      { key: 'p2-c2', reservationId: 'R12341', pocFullName: groupChildName(3), checkInDate: '2024-06-16', checkOutDate: '2024-06-20', room: `402 (${roomTypeShortMap['Deluxe']})`, cancellationPolicy: 'Non-refundable', businessSource: 'Expedia', totalCharges: 1800, balance: 300 },
      { key: 'p2-c3', reservationId: 'R12342', pocFullName: groupChildName(4), checkInDate: '2024-06-16', checkOutDate: '2024-06-20', room: `403 (${roomTypeShortMap['Deluxe']})`, cancellationPolicy: 'Non-refundable', businessSource: 'Expedia', totalCharges: 1800, balance: 300 },
    ],
  },
  {
    key: 'parent-3',
    reservationId: 'R12343',
    pocFullName: 'Suite Group',
    checkInDate: '2024-06-21',
    checkOutDate: '2024-06-25',
    room: `Multiple (${roomTypeShortMap['Suite']})`,
    cancellationPolicy: 'Flexible',
    businessSource: 'Agoda',
    totalCharges: 9000,
    balance: 1500,
    children: [
      { key: 'p3-c1', reservationId: 'R12344', pocFullName: groupChildName(5), checkInDate: '2024-06-21', checkOutDate: '2024-06-25', room: `501 (${roomTypeShortMap['Suite']})`, cancellationPolicy: 'Flexible', businessSource: 'Agoda', totalCharges: 2250, balance: 375 },
      { key: 'p3-c2', reservationId: 'R12345', pocFullName: groupChildName(6), checkInDate: '2024-06-21', checkOutDate: '2024-06-25', room: `502 (${roomTypeShortMap['Suite']})`, cancellationPolicy: 'Flexible', businessSource: 'Agoda', totalCharges: 2250, balance: 375 },
    ],
  },
  ...generateData(30).map(item => ({ ...item, key: `g${item.key}` })),
];

function flattenData(data: any[]): any[] {
  const result: any[] = [];
  data.forEach(row => {
    const { children, ...parentData } = row;
    result.push({ ...parentData, isParent: !!children, isChild: false });
    if (children) {
      children.forEach((child: any) => {
        result.push({ ...child, isParent: false, isChild: true });
      });
    }
  });
  return result;
}

const flatAllData = flattenData(allDataNested);

const pageSizeOptions = [5, 10, 20, 30, 50];

// Robust date formatter for 'YYYY-MM-DD' to 'MMM DD, YYYY'
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

// Add this component above BatchFolio
const TruncateTooltipCell: React.FC<{ value: string }> = ({ value }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [value]);

  const cell = (
    <span
      ref={spanRef}
      className="table-cell-ellipsis"
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxWidth: 180 }}
    >
      {value}
    </span>
  );
  return isTruncated ? (
    <Tooltip title={value} placement="top">
      {cell}
    </Tooltip>
  ) : cell;
};

const RESERVATION_STATUSES = [
  { value: 'Unconfirmed', label: 'Unconfirmed', color: '#F5F5F5', borderColor: '#D9D9D9', textColor: '#222', icon: <span style={{marginRight: 8}}>👤⏰</span> },
  { value: 'Confirmed', label: 'Confirmed', color: '#E9FBEA', borderColor: '#A6E9B6', textColor: '#22543D', icon: <span style={{marginRight: 8}}>✔️</span> },
  { value: 'Transfer Out', label: 'Transfer Out', color: '#FDF3F3', borderColor: '#F5C6C6', textColor: '#7B2C2C', icon: <span style={{marginRight: 8}}>👤➡️</span> },
  { value: 'Cancelled', label: 'Cancelled', color: '#FDF3F3', borderColor: '#F5C6C6', textColor: '#7B2C2C', icon: <span style={{marginRight: 8}}>📅⛔</span> },
  { value: 'No Show', label: 'No Show', color: '#FFFDEB', borderColor: '#FFF3BF', textColor: '#8D6B1B', icon: <span style={{marginRight: 8}}>🚫</span> },
  { value: 'Checked-Out', label: 'Checked-Out', color: '#F3F6FD', borderColor: '#BFD7F5', textColor: '#2C3A7B', icon: <span style={{marginRight: 8}}>🔄</span> },
  { value: 'In-House', label: 'In-House', color: '#E6F8FA', borderColor: '#B6E9F5', textColor: '#22607B', icon: <span style={{marginRight: 8}}>🏠</span> },
];
const BUSINESS_SOURCES = [
  'ASI WebRes', 'Walk-In', 'Mobile', 'Google Hotel Booking', 'Expedia', 'Hotels.com', 'Hotwire', 'SynXis Web', 'Booking.com', 'Travelocity (GHE)', 'Agoda', 'Ctrip', 'Travlu'
];
const BUILDINGS = ['Building A', 'Building B', 'Building C'];
const FLOORS = ['Floor 1', 'Floor 2', 'Floor 3'];

// Helper to get unique room types from data
const getRoomTypes = (data: any[]) => Array.from(new Set(data.map(d => d.roomType)));

// Add this component above BatchFolio
const statusTagConfig: Record<string, { bg: string; border: string; color: string; icon: React.ReactNode }> = {
  'In-House': {
    bg: '#EDFDFD', border: '#9DECF9', color: '#086F83',
    icon: <InHouseIcon width={14} height={14} style={{ color: '#086F83' }} />
  },
  Cancelled: {
    bg: '#FFF5F5', border: '#FEB2B2', color: '#822727',
    icon: <CancelledIcon width={14} height={14} style={{ color: '#822727' }} />
  },
  'Transfer Out': {
    bg: '#FFFAF0', border: '#FBD38D', color: '#7B341E',
    icon: <span style={{ display: 'flex', alignItems: 'center', width: 14, height: 14 }}><TransferOutIcon width={14} height={14} style={{ color: '#7B341E' }} /></span>
  },
  'No Show': {
    bg: '#FFFFF0', border: '#FAF089', color: '#744210',
    icon: <NoShowIcon width={14} height={14} style={{ color: '#744210' }} />
  },
  'Checked-Out': {
    bg: '#F1F6FF', border: '#ACC4FD', color: '#333D73',
    icon: <CheckedOutIcon width={14} height={14} style={{ color: '#333D73' }} />
  },
  Unconfirmed: {
    bg: 'rgba(0,0,0,0.02)', border: '#D9D9D9', color: 'rgba(0,0,0,0.88)',
    icon: <UnconfirmedIcon width={14} height={14} style={{ color: 'rgba(0,0,0,0.88)' }} />
  },
  Confirmed: {
    bg: '#F0FFF4', border: '#9AE6B4', color: '#22543D',
    icon: <ConfirmedIcon width={14} height={14} style={{ color: '#22543D' }} />
  },
};

// Normalization function for status keys
const normalizeStatus = (status: string) => {
  if (!status) return 'Unconfirmed';
  const map: Record<string, string> = {
    unconfirmed: 'Unconfirmed',
    confirmed: 'Confirmed',
    'transfer out': 'Transfer Out',
    cancelled: 'Cancelled',
    'no show': 'No Show',
    'checked-out': 'Checked-Out',
    'checked out': 'Checked-Out',
    'in-house': 'In-House',
    'in house': 'In-House',
  };
  const key = status.trim().toLowerCase();
  return map[key] || 'Unconfirmed';
};

const ReservationStatusTag: React.FC<{ status: string }> = ({ status }) => {
  const config = statusTagConfig[normalizeStatus(status)] || statusTagConfig['Unconfirmed'];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: config.bg,
      border: `1px solid ${config.border}`,
      color: config.color,
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '16px',
      borderRadius: 4,
      padding: '4px 8px',
      userSelect: 'none',
      minWidth: 0,
      maxWidth: 120,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', flex: 'none', fontSize: 14, width: 14, height: 14 }}>{config.icon}</span>
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline' }}>{normalizeStatus(status)}</span>
    </span>
  );
};

const MANDATORY_COLUMNS = [
  { key: 'reservationId', label: 'Reservation ID' },
  { key: 'pocFullName', label: 'Full name of POC' },
];
const CUSTOMIZABLE_COLUMNS = [
  { key: 'checkInDate', label: 'Check-In Date' },
  { key: 'checkOutDate', label: 'Check-Out Date' },
  { key: 'room', label: 'Room' },
  { key: 'cancellationPolicy', label: 'Cancellation Policy' },
  { key: 'businessSource', label: 'Business Source' },
  { key: 'totalCharges', label: 'Total Charges ($)' },
  { key: 'balance', label: 'Balance ($)' },
  { key: 'reservationStatus', label: 'Reservation Status' },
];

const BatchFolio: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null,
    reservationStatus: [] as string[],
    buildings: [] as string[],
    floors: [] as string[],
    businessSources: [] as string[],
    roomTypes: [] as string[],
  });
  const [pendingFilters, setPendingFilters] = useState(filters);
  const [customColumns, setCustomColumns] = useState(
    CUSTOMIZABLE_COLUMNS.map(col => ({ ...col, visible: true }))
  );
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrent(1); // Reset to first page on new search
  };

  const getSortedData = () => {
    let data = flatAllData;

    if (searchText.trim()) {
      const lower = searchText.trim().toLowerCase();
      data = data.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(lower)
        )
      );
    }

    return data;
  };

  const finalData = getSortedData();
  const pagedData = finalData.slice((current - 1) * pageSize, current * pageSize);

  const handleClearAll = () => setPendingFilters({
    dateRange: null,
    reservationStatus: [],
    buildings: [],
    floors: [],
    businessSources: [],
    roomTypes: [],
  });
  const handleCancel = () => setFilterDrawerOpen(false);
  const handleShowResults = () => {
    setFilters(pendingFilters);
    setFilterDrawerOpen(false);
  };

  // Filtering logic
  const filteredData = finalData.filter(row => {
    // Date range
    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      const checkIn = dayjs(row.checkInDate);
      if (checkIn.isBefore(start, 'day') || checkIn.isAfter(end, 'day')) return false;
    }
    // Reservation Status
    if (filters.reservationStatus.length && !filters.reservationStatus.includes(row.reservationStatus)) return false;
    // Buildings
    if (filters.buildings.length && !filters.buildings.includes(row.building)) return false;
    // Floors
    if (filters.floors.length && !filters.floors.includes(row.floor)) return false;
    // Business Sources
    if (filters.businessSources.length && !filters.businessSources.includes(row.businessSource)) return false;
    // Room Types
    if (filters.roomTypes.length && !filters.roomTypes.includes(row.roomType)) return false;
    return true;
  });

  // Before rendering the table, inject demo rows for all statuses at the top
  const demoStatusRows = Object.keys(statusTagConfig).map((status, i) => ({
    key: `demo-status-${i}`,
    reservationId: `DEMO${i + 1}`,
    pocFullName: 'Demo User',
    checkInDate: '2024-06-01',
    checkOutDate: '2024-06-02',
    room: '101 (STD)',
    cancellationPolicy: 'Flexible',
    businessSource: 'Demo Source',
    totalCharges: 100,
    balance: 0,
    reservationStatus: status,
    building: 'Demo Building',
    floor: 'Demo Floor',
    roomType: 'Demo Room',
  }));
  const filteredDataWithDemo = filteredData.length === 0 ? [] : [...demoStatusRows, ...filteredData];

  const handleToggleColumn = (key: string) => {
    setCustomColumns(cols =>
      cols.map(col =>
        col.key === key ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleMoveColumn = (from: number, to: number) => {
    setCustomColumns(cols => update(cols, {
      $splice: [
        [from, 1],
        [to, 0, cols[from]],
      ],
    }));
  };

  if (customColumns.length === 0) {
    setCustomColumns(CUSTOMIZABLE_COLUMNS.map(col => ({ ...col, visible: true })));
  }
  const visibleColumns = [
    ...MANDATORY_COLUMNS,
    ...customColumns.filter(col => col.visible),
  ];
  console.log('Visible columns:', visibleColumns);

  // Render the customize columns dropdown (only for customizable columns)
  const CustomizeColumnsDropdown = () => (
    <div style={{ minWidth: 240, background: '#fff', borderRadius: 8, boxShadow: '0 6px 16px 0 rgba(0,0,0,0.08),0 3px 6px -4px rgba(0,0,0,0.12),0 9px 28px 8px rgba(0,0,0,0.05)', padding: 4 }}>
      <div style={{ fontWeight: 600, fontSize: 14, padding: '12px 16px 8px 16px', borderBottom: '1px solid #f0f0f0' }}>Customize columns</div>
      <div style={{ maxHeight: 320, overflowY: 'auto', padding: '8px 0' }}>
        {customColumns.map((col, idx) => (
          <div key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 16px', cursor: 'grab' }}>
            <MenuOutlined style={{ color: '#bfbfbf', fontSize: 16, cursor: 'grab' }} draggable onDragStart={e => { e.dataTransfer.setData('colIdx', String(idx)); }} onDrop={e => { e.preventDefault(); const from = Number(e.dataTransfer.getData('colIdx')); handleMoveColumn(from, idx); }} onDragOver={e => e.preventDefault()} />
            <Checkbox checked={col.visible} onChange={() => handleToggleColumn(col.key)} style={{ marginRight: 8 }} />
            <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.88)', whiteSpace: 'nowrap', flex: 1 }}>{col.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const columnsWithNesting = visibleColumns.map(col => {
    let width;
    if (col.key === 'reservationId') width = 180;
    else if (col.key === 'pocFullName') width = 160;
    else if (col.key === 'checkInDate') width = 160;
    else if (col.key === 'checkOutDate') width = 160;
    else if (col.key === 'room') width = 120;
    else if (col.key === 'businessSource') width = 180;
    else if (col.key === 'totalCharges') width = 170;
    else if (col.key === 'balance') width = 140;
    return {
      title: col.label,
      dataIndex: col.key,
      key: col.key,
      align: col.key === 'totalCharges' || col.key === 'balance' ? 'right' as const : undefined,
      width,
      sorter: (a: any, b: any) => {
        if (col.key === 'totalCharges' || col.key === 'balance') {
          return a[col.key] - b[col.key];
        }
        if (col.key === 'checkInDate' || col.key === 'checkOutDate') {
          return new Date(a[col.key]).getTime() - new Date(b[col.key]).getTime();
        }
        if (col.key === 'reservationStatus') {
          return normalizeStatus(a[col.key]).localeCompare(normalizeStatus(b[col.key]));
        }
        return String(a[col.key]).localeCompare(String(b[col.key]));
      },
      onCell: col.key === 'reservationId'
        ? (record: any) => record.isChild ? { className: 'nesting-cell-child' } : {}
        : undefined,
      render:
        col.key === 'reservationId'
          ? (text: string, record: any) => {
              if (record.isParent) {
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GroupIcon style={{ color: '#BFBFBF', marginRight: '16px' }} />
                    <div>
                      <span>{text}</span>
                      <div style={{ fontSize: '12px', color: '#555' }}>{record.pocFullName}</div>
                    </div>
                  </div>
                );
              }
              if (record.isChild) {
                return (
                  <div style={{ position: 'relative', height: '100%' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48, background: '#F5F5F5', borderRadius: 2, padding: 0, margin: 0 }} />
                    <span style={{ display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 56 }}>{text}</span>
                  </div>
                );
              }
              return <span>{text}</span>;
            }
          : col.key === 'reservationStatus'
            ? (status: string) => <ReservationStatusTag status={status} />
            : col.key === 'totalCharges' || col.key === 'balance'
              ? (value: number) => value.toFixed(2)
              : col.key === 'checkInDate' || col.key === 'checkOutDate'
                ? (value: string) => formatDate(value)
                : (value: string) => <TruncateTooltipCell value={value} />,
    };
  });

  // Robustly move Reservation Status after Room, if both exist
  const roomColIdx = columnsWithNesting.findIndex(col => col.dataIndex === 'room');
  const resStatusColIdx = columnsWithNesting.findIndex(col => col.dataIndex === 'reservationStatus');
  if (roomColIdx !== -1 && resStatusColIdx !== -1 && resStatusColIdx !== roomColIdx + 1) {
    const [resStatusCol] = columnsWithNesting.splice(resStatusColIdx, 1);
    columnsWithNesting.splice(roomColIdx + 1, 0, resStatusCol);
  }

  const handlePageChange = (page: number, size?: number) => {
    setCurrent(page);
    if (size && size !== pageSize) setPageSize(size);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '60px', display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f6fa', overflow: 'hidden' }}>
        <HeaderBar />
        <div className="main-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="content-container" style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <h1 className="batch-folio-heading">Batch Folio</h1>
            <div className="batch-folio-toolbar">
              <div>
                <Input.Search
                  placeholder="Search for res ID, guests, etc"
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  style={{ width: 280, height: 40 }}
                  value={searchText}
                  onChange={e => handleSearch(e.target.value)}
                  onSearch={handleSearch}
                />
              </div>
              <div className="batch-folio-toolbar-actions">
                <Button
                  icon={<FunnelIcon style={{ width: 24, height: 24 }} />}
                  className="batch-folio-toolbar-btn"
                  onClick={() => setFilterDrawerOpen(true)}
                />
                <Dropdown
                  overlay={<CustomizeColumnsDropdown />}
                  trigger={["click"]}
                  open={customizeOpen}
                  onOpenChange={setCustomizeOpen}
                  placement="bottomRight"
                  arrow
                >
                  <Button icon={<ColumnsIcon style={{ width: 24, height: 24 }} />} className="batch-folio-toolbar-btn" />
                </Dropdown>
              </div>
            </div>
            <div className="table-wrapper">
              <Table
                columns={columnsWithNesting}
                dataSource={filteredDataWithDemo}
                rowSelection={{
                  type: 'checkbox',
                  columnWidth: 48,
                  selectedRowKeys,
                  onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
                }}
                pagination={false}
                style={{ marginTop: 24, flex: 1, minHeight: 0 }}
                scroll={{ x: 'max-content', y: 388 }}
                childrenColumnName="nonExistentProperty"
                onRow={record => record.isChild ? { className: 'nesting-row-child' } : {}}
              />
            </div>
            <div className="batch-folio-pagination-bar">
              <div className="pagination-total">Total {finalData.length} results</div>
              <Pagination
                current={current}
                pageSize={pageSize}
                total={finalData.length}
                showSizeChanger={false}
                pageSizeOptions={pageSizeOptions.map(String)}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                style={{ flex: 1, justifyContent: 'center', display: 'flex' }}
              />
              <div className="pagination-size-selector">
                <Select
                  value={pageSize}
                  onChange={size => handlePageChange(1, size)}
                  options={pageSizeOptions.map(size => ({ value: size, label: `${size} / page` }))}
                  style={{ width: 100 }}
                />
              </div>
            </div>
            <div className="batch-folio-bottom-actions">
              <div className="batch-folio-bottom-actions-group">
                <Button
                  type="primary"
                  style={selectedRowKeys.length === 0 ? undefined : { background: '#3E4BE0', borderColor: '#3E4BE0' }}
                  disabled={selectedRowKeys.length === 0}
                >Folio</Button>
                <Button
                  type="primary"
                  style={selectedRowKeys.length === 0 ? undefined : { background: '#3E4BE0', borderColor: '#3E4BE0' }}
                  disabled={selectedRowKeys.length === 0}
                >Detailed Folio</Button>
                <Button
                  type="primary"
                  style={selectedRowKeys.length === 0 ? undefined : { background: '#3E4BE0', borderColor: '#3E4BE0' }}
                  disabled={selectedRowKeys.length === 0}
                >Registration Form</Button>
              </div>
            </div>
            <Drawer
              title={<span>Filters <Button type="link" icon={<CloseOutlined />} onClick={handleClearAll} style={{ float: 'right' }}>Clear All</Button></span>}
              placement="right"
              width={400}
              onClose={() => setFilterDrawerOpen(false)}
              open={filterDrawerOpen}
              bodyStyle={{ padding: 24 }}
              footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <Button type="text" onClick={handleCancel}>Cancel</Button>
                  <Button type="primary" onClick={handleShowResults}>Show {filteredData.length} Results</Button>
                </div>
              }
            >
              <Form layout="vertical">
                <Form.Item label="Date Range">
                  <DatePicker.RangePicker
                    value={pendingFilters.dateRange}
                    onChange={val => {
                      // Normalize: if val is null or contains nulls, set to null
                      const normalized = val && val[0] && val[1] ? val as [dayjs.Dayjs, dayjs.Dayjs] : null;
                      setPendingFilters(f => ({ ...f, dateRange: normalized }));
                    }}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Reservation Status">
                  <Select
                    mode="multiple"
                    value={pendingFilters.reservationStatus}
                    onChange={val => setPendingFilters(f => ({ ...f, reservationStatus: val }))}
                    options={RESERVATION_STATUSES.map(s => ({ value: s.value, label: s.label }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Buildings">
                  <Select
                    mode="multiple"
                    value={pendingFilters.buildings}
                    onChange={val => setPendingFilters(f => ({ ...f, buildings: val }))}
                    options={BUILDINGS.map(b => ({ value: b, label: b }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Floors">
                  <Select
                    mode="multiple"
                    value={pendingFilters.floors}
                    onChange={val => setPendingFilters(f => ({ ...f, floors: val }))}
                    options={FLOORS.map(f => ({ value: f, label: f }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Business Sources">
                  <Select
                    mode="multiple"
                    value={pendingFilters.businessSources}
                    onChange={val => setPendingFilters(f => ({ ...f, businessSources: val }))}
                    options={BUSINESS_SOURCES.map(s => ({ value: s, label: s }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Room Types">
                  <Select
                    mode="multiple"
                    value={pendingFilters.roomTypes}
                    onChange={val => setPendingFilters(f => ({ ...f, roomTypes: val }))}
                    options={getRoomTypes(finalData).map(rt => ({ value: rt, label: rt }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Form>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchFolio; 