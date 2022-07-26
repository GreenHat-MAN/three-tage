<template>
  <div>
    <!-- 头部 -->
    <hearder title="contact manager" :back="true"></hearder>

    <!-- 新建联系人 -->
    <div class="people">
      <van-contact-card type="add" @click="onAdd" />
    </div>

    <!-- 编辑 -->
    <div class="edit">
      <van-contact-card
        type="edit"
        :name="currentContact.name"
        :tel="currentContact.tel"
        @click="onEdit"
      />
    </div>


    <!-- 不可编辑 -->
    <van-contact-card type="edit" name="Admin" tel="123456" :editable="false" />
  </div>
</template>

<script>
export default {
  name: "people",
  data() {
    return {
        currentContact: {
        name: '张三',
        tel: '13000000000',
      },
    };
  },
  methods: {
    onAdd() {
    //   Toast("新增");
    },
    onEdit() {
    //   Toast('编辑');
    },
  },
};
</script>

<style>
</style>