<template>
  <div>
    <h2>商品详情页</h2>
    <table>
      <caption>
        {{
          msg
        }}
      </caption>
      <thead>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>住址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="i">
          <td>{{ i }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.adress }}</td>
          <td>
            <button @click="delinfo(item, i)">删除</button>
            <button @click="changeinfo(item, i)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <label for="">姓名:</label><input type="text" v-model="form.name" /><br />
      <label for="">年龄:</label><input type="text" v-model="form.age" /><br />
      <label for="">住址:</label><input type="text" v-model="form.adress" /><br />
      <button @click="add">添加</button>
    </div>
  </div>
</template>

<script>
import * as $ from "@/utils/jquery-3.6.0.min";
// 实现表格的增删改查
export default {
  data() {
    return {
      list: [],
      msg: "",
      info: [],
      form: {},
    };
  },

  methods: {


    // 删除
    delinfo(item, i) {
      $.ajax({
        url: "http://localhost:2206/data/" + item.id,
        type: "DELETE",
        success: res=> {
          this.$delete(this.data, i)
        },
      }).then(res=>{
        this.getData()
      });
    },



    // 修改
    changeinfo(item, i) {
      let username = window.prompt(item.id, item.name);
      if (username && username != item.name) {
        item.name = username;
        $.ajax({
          url: "http://localhost:2206/data"+item.id,
          type: "PATCH",
          data: { username },
          success: function (res) {
            this.$set(this.data, i, item)
          },
        });
      }
    },



    //添加
    add() {
      $.post("http://localhost:2206/data", this.form, {}).then((res) => {
        //添加成功将对象清空
        (this.form = {}),
          // 重新调用数据
          this.getData()
      });
    },


    // 请求数据
    getData() {
      // 请求data数据
      $.get("http://localhost:2206/data", {}).then((res) => {
        this.list = res
      });
    },
  },


  mounted() {
    // 请求title数据
    $.get("http://localhost:2206/title", {}).then((res) => {
      this.msg = res[0]
    });
    // 调用请求数据的方法
    this.getData()
  },


};
</script>

<style scope>
table {
  width: 100%;
  border-collapse: collapse;
}
table caption {
  font-size: 2em;

  font-weight: bold;

  margin: 1em 0;
}
th,
td {
  border: 1px solid #999;
  text-align: center;
  padding: 20px 0;
}
table thead tr {
  background-color: #008c8c;

  color: #fff;
}
table tbody tr:nth-child(odd) {
  background-color: #eee;
}
table tbody tr:hover {
  background-color: #ccc;
}
table tbody tr td:first-child {
  color: #f40;
}
table tfoot tr td {
  text-align: right;

  padding-right: 20px;
}
</style>