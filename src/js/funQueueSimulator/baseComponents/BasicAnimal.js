export default {
  append: false,
  classList: 'position-absolute d-flex flex-column align-items-center',
  style: {
    width: '90px',
    bottom: '30px',
    left: '1px',
    zIndex: '2',
  },
  childsConfig: [
    {
      text: 'animal',
      element: 'span',
      classList: 'badge',
      style: {
        fontSize: '10px',
        width: '50%',
        height: '19%',
      },
    },
    {
      classList: 'progress my-1',
      style: {
        backgroundColor: 'rgb(139, 139, 139)',
        width: '40%',
        height: '7%',
      },
      childsConfig: [
        {
          classList: 'progress-bar',
          style: {
            width: '0%',
          },
        },
      ],
    },
    {
      element: 'img',
    },
  ],
};
