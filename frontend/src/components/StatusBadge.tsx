import React from 'react';

interface StatusBadgeProps {
  status: 'idle' | 'running' | 'completed' | 'failed';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'idle':
        return {
          text: 'Idle',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-400',
        };
      case 'running':
        return {
          text: 'Running',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          dotColor: 'bg-blue-500',
        };
      case 'completed':
        return {
          text: 'Completed',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          dotColor: 'bg-green-500',
        };
      case 'failed':
        return {
          text: 'Failed',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          dotColor: 'bg-red-500',
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-400',
        };
    }
  };

  const config = getStatusConfig();

  return React.createElement(
    'div',
    {
      className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} ${className}`,
    },
    [
      React.createElement(
        'div',
        {
          className: `w-2 h-2 rounded-full mr-2 ${config.dotColor} ${status === 'running' ? 'animate-pulse' : ''}`,
        }
      ),
      config.text
    ]
  );
};
