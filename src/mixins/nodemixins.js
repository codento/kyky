import { isRootNode, mod } from '../utils'
import EventBus from '../utils/eventBus'
import initialNode from '../assets/initialNode'

export default {
  data () {
    return {
      /* eslint-disable */
       node: initialNode,
       parent: null,
       index: 0,
       animations: ['slideup', 'slidedown'],
       audios: [],
       colorIndex: 2,
       prevColor: '',
       colors: [
        '#f5a3c7',
        '#ffc61e',
        '#ffffff',
        '#00d7a7',
        '#dedfe1',
        '#c2a251',
        '#f5a3c7',
        '#ffe977',
        '#009246',
        '#ffc61e',
        '#dedfe1',
        '#c2a251',
       ]
    }
  },
  methods: {
    bgStyle(previous) {
      if(previous){
        return 'z-index: 0; background-color: ' + this.prevColor
      } else {
        return 'z-index: 0; background-color: ' + this.colors[this.colorIndex]
      }
    },
    moveToParent () {
      if (isRootNode(this.node.id)) {
        this.node = this.parent
        this.parent = this.parent.parent
        this.transitionOrientation = 'slidedown'
        this.path.pop()
        this.prevColor = this.colors[this.colorIndex]
        this.colorIndex--
      }
    },
    moveToSibling (left) {
      if (isRootNode(this.node.id)) {
        left ? this.index++ : this.index--
        const childs = this.parent.children
        while (!childs[ mod(this.index, this.parent.children.length) ].icon || childs[ mod(this.index, this.parent.children.length) ].url) {
          left ? this.index++ : this.index--
        }
        this.transitionOrientation = (left) ? 'slideleft' : 'slideright'
        this.node = this.parent.children[ mod(this.index, this.parent.children.length) ]
        this.path.splice(this.path.length-1, 1, this.node.icon)
        this.prevColor = this.colors[this.colorIndex]
      }
    },
    moveToChild (index) {
      const node = this.node.children[index];
      if (!!this.node.children.length > 0 && !node.url) {
        this.index = index
        this.node.parent = this.parent
        this.parent = this.node
        this.node = this.node.children[index]
        this.transitionOrientation = 'slideup'
        if(node.audio[this.languageIndex]){  EventBus.$emit('playAudio',node.audio[this.languageIndex])}
        this.path.push(this.node.icon)
      }
      this.prevColor = this.colors[this.colorIndex]

      this.colorIndex++
      if (node.url){
        window.open(node.url,"_self")
      }
    },
  }
}
