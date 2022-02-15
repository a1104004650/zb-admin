<template>
    <span class="zbc-badge-status" :class="`zbc-badge-status-${theme}`">

    </span>
</template>

<style lang="scss" scoped>

$badge-success:#52c41a;
$badge-error:#ff4d4f;
$badge-processing:#1890ff;
$badge-warning:#faad14;

.zbc-badge-status {
    position: relative;
    top: 0px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
}
.zbc-badge-status-processing {
    position: relative;
    background-color: $badge-processing;
    &:after {
    border: 1.5px solid $badge-processing;
        @extend .animation;
   }
}
.zbc-badge-status-error {
    position: relative;
    background-color: $badge-error;
    &:after {
    border: 1.5px solid $badge-error;
        @extend .animation;
    }
}
.zbc-badge-status-success {
    position: relative;
    background-color: $badge-success;
    &:after {
        border: 1.5px solid $badge-success;
        @extend .animation;
   }
}
.zbc-badge-status-warning {
    position: relative;
    background-color: $badge-warning;
    &:after {
    border: 1.5px solid  $badge-warning;
        @extend .animation;
    }
}
.animation {
    position: absolute;
    top: -1.5px;
    left: -1.5px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -webkit-animation: antStatusProcessing 1.2s ease-in-out infinite;
    animation: antStatusProcessing 1.2s ease-in-out infinite;
    content: "";
}
@-webkit-keyframes antStatusProcessing {
    0% {
        -webkit-transform: scale(.8);
        transform: scale(.8);
        opacity: .5
    }

    to {
        -webkit-transform: scale(1.8);
        transform: scale(1.8);
        opacity: 0
    }
}

@keyframes antStatusProcessing {
    0% {
        -webkit-transform: scale(.8);
        transform: scale(.8);
        opacity: .5
    }

    to {
        -webkit-transform: scale(1.8);
        transform: scale(1.8);
        opacity: 0
    }
}
</style>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'default'
        }
    },
    data() {
      return {
         "themeClass":""
      }
    },
    created(){
      this.themeClass = this.theme
    }
}
</script>