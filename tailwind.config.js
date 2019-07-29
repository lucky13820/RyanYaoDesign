module.exports = {
  theme: {
    // screens: {
    //   'sm': {'max': '639px'},
    //   // => @media (max-width: 639px) { ... }

    //   'md': {'max': '767px'},
    //   // => @media (max-width: 767px) { ... }

    //   'lg': {'max': '1023px'},
    //   // => @media (max-width: 1023px) { ... }

    //   'xl': {'max': '1279px'},
    //   // => @media (max-width: 1279px) { ... }
    // },
    colors: {
      orange: {
        100: '#FDF0EA',
        500: '#EA6D30',
        700: '#C05621'
      },
      pink: {
        100: '#FEEFF2',
        300: '#F9CBD5',
        500: '#F06381'
      },
      gray: {
        100: '#F6F6F7',
        300: '#E1E4E9',
        500: '#929BA6',
      },
      white: '#fafafa',
      black: '#171B1C',
    },
    fontFamily: {
      'display': ['VisbyCF-Bold', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto,tahoma', 'Verdana,arial', "PingFang SC", "Hiragino Sans GB", "WenQuanYi Micro Hei", 'STXihei', "华文细黑", "Microsoft Yahei", "微软雅黑", 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem'
    },
    boxShadow: {
      'default': '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      'md': ' 0px 1px 3px rgba(9, 41, 120, 0.13), 0px 4px 8px rgba(0, 0, 0, 0.13)',
      'lg': ' 0px 3px 6px rgba(9, 41, 120, 0.13), 0px 8px 16px rgba(0, 0, 0, 0.13)',
      'xl': ' 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
      'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.02)',
      'outline': '0 0 0 3px rgba(66,153,225,0.5)',
      'none': 'none'
    },
    letterSpacing: {
      wide: '.015em',
      wider: '.025em'
    },
    screens: {
      'dark-mode': {'raw': '(prefers-color-scheme: dark)'},
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
    },
  }
}
