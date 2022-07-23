<template>
  <div class="search-info-container">
    <div class="search-result">
      <div class="item-container">
        <ul v-for="(l, i) in list" :key="i">
          <li class="item">
            {{ l.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchres",
  props: ["list"],
};
</script>

<style lang="scss" scoped>

    .search-info-container{
        outline: 0;
        border-style: none;
        -webkit-appearance: none;
        margin: 0;
        padding: 0;
        .search-result{
            .item-container{
                padding: 0 12px;
                border-bottom: 1px solid #e7e7e7;
                background-color: #fff;
                ul{
                    list-style: none;
                    .item{
                        position: relative;
                        box-sizing: border-box;
                        width: 100%;
                        height: 44px;
                        padding-right: 14px;
                        border-bottom: 1px solid #e7e7e7;
                        background-color: #fff;
                        font-size: 14px;
                        line-height: 44px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }

</style>