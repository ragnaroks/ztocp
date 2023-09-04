/** @type {import('tailwindcss').Config} */
const config = {
  content: ["components/*.tsx","app/**/*.tsx"],
  theme:{
    extend:{
      colors:{
        pure:{'red':'#ff0000','orange':'#ffa500','yellow':'#ffff00','green':'#008000','cyan':'#00ffff','blue':'#0000ff','purple':'#800080'},
        site:{'zerotier':'#ffb441'}
      },
      width:{
        site:'85rem'
      }
    }
  }
};

module.exports = config;
