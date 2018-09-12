import { languages } from '../utils'

export default {
  data () {
    return {
      /* eslint-disable */
      languages: languages,
      languageIndex: languages.findIndex(language => language === this.language),
    }
  },
  props:{
    language: {
      default: 'fi',
      type: String
    }
  },
  methods: {
    changeLanguage: function () {
      if (this.languageIndex === this.languages.length - 1 || this.languageIndex === 1) {
        this.languageIndex = 0
      } else {
        this.languageIndex++
      }
    },
    setLanguage: function (index) {
      this.selectedLanguage = index
    }
  },
  computed: {
    selectedLanguage: {
      get: function () {
        return languages[this.languageIndex]
      }
    }
  },
}
