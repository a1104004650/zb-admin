<template>
    <div class="page">
        <div class="page-content">
            <div class="content">
                <div class="con">
                    <h2>Sorry</h2>
                    <p class="p">出错了，页面不存在！</p> 
                    <router-link to="/portal"><p class="button">返回首页</p></router-link>
                </div>
            </div>
            <div class="errorImg"><img src="../../assets/image/error/error.png"/></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
 .page{
    background: #304156;
    height: 100%;
    .page-content{
        width: 750px;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -o-transform: translatey(-50%,-50%);
        .content{
            float: left;
            .con{
                margin-top: 50px;
            }
            h2{
                color: white;
                font-size: 40px;
                font-weight: normal;
                margin: 0;
            }
            .p{
                color: white;
                font-size:28px;
                margin-top: 15px;
                border-top: 2px solid white;
                padding-top: 15px;
            }
            .button{
                width: 160px;
                height: 46px;
                line-height: 46px;
                background-color: white;
                color: #304156;
                text-align: center;
                border-radius: 23px;
                margin-top: 120px;
                font-size: 20px;
            }
        }
        .errorImg{
            float: right;
            img{
              width: 320px;
            }
        }
    }
 }

</style>