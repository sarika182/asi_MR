import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateCourtesyHold: React.FC = () => {
  const { resId } = useParams<{ resId: string }>();
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Update Courtesy Hold</h1>
      <p>Courtesy Hold ID: <strong>{resId}</strong></p>
      <p>This is a placeholder page for updating courtesy hold details.</p>
    </div>
  );
};

export default UpdateCourtesyHold; 