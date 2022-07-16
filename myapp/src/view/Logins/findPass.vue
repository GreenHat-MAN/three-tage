<template>
  <div>
    <myheard title="找回密码" :back="true"></myheard>
    <div class="find">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="账号"
          placeholder="请输入账号/手机"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >下一步</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "findPass",
  data() {
    return {
      username:''
    };
  },
};
</script>

<style>
</style>