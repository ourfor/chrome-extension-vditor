const LazyLoadImage = () => {
    const loadImg = (it) => {
      const testImage = document.createElement('img')
      testImage.src = it.getAttribute('data-src')
      testImage.addEventListener('load', () => {
        it.src = testImage.src
        it.style.backgroundImage = 'none'
        it.style.backgroundColor = 'transparent'
      })
      it.removeAttribute('data-src')
    }
  
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('img').forEach((data) => {
        if (data.getAttribute('data-src')) {
          loadImg(data)
        }
      })
      return false
    }
  
    if (window.imageIntersectionObserver) {
      window.imageIntersectionObserver.disconnect()
      document.querySelectorAll('img').forEach(function (data) {
        window.imageIntersectionObserver.observe(data)
      })
    } else {
      window.imageIntersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entrie) => {
          if ((typeof entrie.isIntersecting === 'undefined'
            ? entrie.intersectionRatio !== 0
            : entrie.isIntersecting) && entrie.target.getAttribute('data-src')) {
            loadImg(entrie.target)
          }
        })
      })
      document.querySelectorAll('img').forEach(function (data) {
        window.imageIntersectionObserver.observe(data)
      })
    }
  }
  
  window.vditor = new Vditor('vditor', {
    counter: 100,
    height: 700,
    editorName: 'vditor',
    hint: {
      emojiPath: 'https://static.hacpai.com/emoji/graphics',
      emojiTail: '<a href="https://hacpai.com/settings/function" target="_blank">设置常用表情</a>',
      emoji: {
        '+1': '👍',
        '-1': '👎',
        'egg': '🥚',
        'eggplant': '🍆',
        'eight': '8⃣',
        'eight_pointed_black_star': '✴',
        'eight_spoked_asterisk': '✳',
        'electric_plug': '🔌',
        'elephant': '🐘',
        'email': '✉',
        'end': '🔚',
        'envelope': '✉',
        'es': '🇪🇸',
        'euro': '💶',
        'european_castle': '🏰',
        'european_post_office': '🏤',
        'evergreen_tree': '🌲',
        'exclamation': '❗',
        'expressionless': '😑',
        'eyeglasses': '👓',
        'eyes': '👀',
        'facepunch': '👊',
        'factory': '🏭',
        'fallen_leaf': '🍂',
        'family': '👪',
        'fast_forward': '⏩',
        'fax': '📠',
        'fearful': '😨',
        'feet': '🐾',
        'ferris_wheel': '🎡',
        'file_folder': '📁',
        'fire': '🔥',
        'fire_engine': '🚒',
        'fireworks': '🎆',
        'first_quarter_moon': '🌓',
        'first_quarter_moon_with_face': '🌛',
        'fish': '🐟',
        'fish_cake': '🍥',
        'fishing_pole_and_fish': '🎣',
        'fist': '✊',
        'five': '5⃣',
        'flags': '🎏',
        'flashlight': '🔦',
        'floppy_disk': '💾',
        'flower_playing_cards': '🎴',
        'flushed': '😳',
        'foggy': '🌁',
        'football': '🏈',
        'fork_and_knife': '🍴',
        'fountain': '⛲',
        'four': '4⃣',
        'four_leaf_clover': '🍀',
        'fr': '🇫🇷',
        'free': '🆓',
        'fried_shrimp': '🍤',
        'fries': '🍟',
        'frog': '🐸',
        'frowning': '😦',
        'fuelpump': '⛽',
        'full_moon': '🌕',
        'full_moon_with_face': '🌝',
        'trollface': 'https://unpkg.com/vditor@1.3.1/dist/images/emoji/trollface.png',
        'huaji': 'https://unpkg.com/vditor@1.3.1/dist/images/emoji/huaji.gif',
      },
    },
    tab: '\t',
    upload: {
      accept: 'image/*,.wav',
      token: 'test',
      url: '/api/upload/editor',
      linkToImgUrl: '/api/upload/fetch',
      filename (name) {
        // ? \ / : | < > * [ ] white to -
        return name.replace(/\?|\\|\/|:|\||<|>|\*|\[|\]|\s+/g, '-')
      },
      handler (file) {
        console.log(file)
        return 'handler'
      },
    },
    preview: {
      mode: 'both',
      parse: () => {
        LazyLoadImage()
      },
    },
  })