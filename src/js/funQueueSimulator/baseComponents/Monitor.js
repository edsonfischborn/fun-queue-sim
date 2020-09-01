export default {
  element: 'div',
  target: '#monitor',
  classList:
    'rounded-left shadow-lg d-flex flex-column scrollbars background-light-dark',
  style: {
    height: '500px',
    width: '400px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  childsConfig: [
    {
      classList:
        'rounded-top d-flex align-items-center justify-content-around text-light',
      element: 'div',
      style: {
        minHeight: '50px',
        backgroundColor: '#555e69',
      },
      childsConfig: [
        {
          element: 'span',
          classList: 'animate__animated',
          text: 'Queue length: -',
        },
        {
          element: 'div',
          classList: 'd-flex align-items-center',
          childsConfig: [
            {
              element: 'div',
              classList: 'dot bg-danger mr-1',
            },
            {
              element: 'span',
              classList: 'text-danger',
              text: 'In queue',
            },
          ],
        },
        {
          element: 'div',
          classList: 'd-flex align-items-center',
          childsConfig: [
            {
              element: 'div',
              classList: 'dot bg-success mr-1',
            },
            {
              element: 'span',
              classList: 'text-success',
              text: 'Finished',
            },
          ],
        },
      ],
    },
  ],
};
