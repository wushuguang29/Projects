<template>
  <view class="box">
    <view class="left label"
          :style="{'width':labelWidth + 'px'}"
    >
      {{ label }}
    </view>
    <view class="right input-box">
      <input
          :id="tag"
          :value="initValue"
          :type="type"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :password="password"
          :placeholder-style="placeholderStyle"
          :placehoder-class="placeholderClass"
          :disabled="disabled"
		  :flag='flag'
          :focus="focus"
          :cursor="cursor"
          class="left"
          @input="input"
          @blur="blur"
          @focus="onFocus"
          @confirm="confirm"
          @keyboardheightchange="onKeyboardheightchange"
          :style="{'margin-left': inputLeftMargin + 'px'}"
      />
      <view
          v-if="!disabledClear"
          class="right"
      >
       <!-- <view
            v-if="isClear"
            class="clear-style"
            @click="clearInputValue"
        >
          <icon
              type="clear"
              size="18"
          />
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
    export default {
        name: "ClearInput",
        props: {
			flag:{
				type:Boolean,
				default:false,
			},
            /* 左侧文本内容 */
            label: {
                type:String,
                default:'',
            },
            /* 左侧文本内容宽度 */
            labelWidth: [Number, String],
            /* 输入框默认值 */
            value: {
                type:String,
                default: '',
            },
            /* 有效值: text number idcard digit */
            type: {
                type:String,
                default: 'text',
            },
            /* 最大输入长度,设置为 -1 的时候不限制,默认不限制 */
            maxlength: {
                type:[Number,String],
                default:-1,
            },
            /* 输入框为空时占位符 */
            placeholder: {
                type:String,
                default:'',
            },
            /* 是否是密码类型 */
            password: {
                type:Boolean,
                default:false,
            },
            /* 指定 placeholder 的样式 */
            placeholderStyle: {
                type:String,
                default:'',
            },
            /* 指定 placeholder 的样式类 */
            placeholderClass: {
                type:String,
                default:'input-placeholder',
            },
            /* 是否禁用 */
            disabled: {
                type:Boolean,
                default:false,
            },
            /* 获取焦点 */
            focus: {
                type:Boolean,
                default:false,
            },
            /* 指定focus时的光标位置 */
            cursor: Number,
            /* 是否禁用清空按钮 */
            disabledClear: {
                type:Boolean,
                default:false,
            },
            /* 唯一标识符,当多个输入框时获取对应输入框的值 */
            tag: {
              type:String,
              default:"input"
            },
        },
        data() {
            return {
                initValue:this.value,
                isClear:false,
                inputLeftMargin: this.labelWidth ? 0 : 20,
            }
        },
        created() {
            this.getInputValue();
        },
		watch:{
			flag(newVal,oldVal){
				console.log('11111',newVal,oldVal)
				if(newVal==true){
					this.clearInputValue();
					newVal==false
				}
			}
		},
        methods: {
            clearInputValue() {
                this.initValue = '';
                this.isClear = false;
				
                this.getInputValue();
            },
            input(e) {
                this.isClear = this.isShowClear(e);
                this.initValue = e.detail.value;
                this.getInputValue();
            },
            blur(e) {
                //#ifdef H5
                window.scrollTo(0,0)
                //#endif
                setTimeout(() => {
                    this.isClear = false;
                }, 200);
                this.getInputValue();
                this.$emit('blur', e);
            },
            onFocus(e) {
                this.isClear = this.isShowClear(e);
                this.getInputValue();
                this.$emit('focus', e);
            },
            confirm(e) {
                this.$emit('confirm', e);
            },
            onKeyboardheightchange(e){
                this.$emit('keyboardheightchange', e);
            },
            isShowClear (e) {
                return e.detail.value.length !== 0;
            },
            getInputValue () {
                this.$emit('getInputValue', {'tag':this.tag, 'value':this.initValue});
            }
        }
    }
</script>

<style lang="scss" scoped>

    .box {
        display: flex;
        justify-content: center;
        align-items: center;

        .left {
          flex: none;
        }

        .right {
           flex: 1;
        }
    }

    .label {
        font-size: 15px;
        color: gray;
    }

    .input-box {
        display: flex;
        justify-items: center;
        align-items: center;

        input {
            height: 44px;
            font-size: 15px;
            color: gray;
        }

        .left {
            flex: 1;
        }

        .right {
            flex: none;
        }
    }

    .clear-style{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 44px;
    }

</style>