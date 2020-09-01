export default {
  element: 'div',
  append: false,
  classList:
    'd-flex align-items-center justify-content-around shadow-lg px-3 animate__animated background-light-dark-2',
  style: {
    width: '100%',
    minHeight: '60px',
  },
  childsConfig: [
    {
      element: 'div',
      classList: 'dot bg-danger mr-1',
    },
    {
      element: 'img',
      attributes: {
        src: '',
      },
      style: {
        width: '40px',
      },
    },
    {
      element: 'div',
      classList: 'd-flex flex-column justify-content-around',
      style: {
        width: '70%',
        height: '30px',
      },
      childsConfig: [
        {
          element: 'div',
          classList: 'd-flex justify-content-between',
          style: {
            color: 'white',
            fontSize: '13px',
          },
          childsConfig: [
            {
              element: 'span',
              text: 'cow-01',
            },
            {
              element: 'span',
              text: '100%',
            },
          ],
        },
        {
          element: 'div',
          classList: 'progress',
          style: {
            backgroundColor: 'rgb(139, 139, 139)',
            width: '100%',
            height: '8px',
          },
          childsConfig: [
            {
              element: 'div',
            },
          ],
        },
      ],
    },
  ],
};
