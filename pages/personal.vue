
<template>
  <v-layout
    column
    justify-center
  >
    <v-subheader>สมาชิก</v-subheader>

    <v-expansion-panel popout>
      <v-expansion-panel-content
        v-for="(message, i) in messages"
        :key="i"
        hide-actions
      >
        <template v-slot:header>
          <v-layout
            align-center
            row
            spacer
          >
            <v-flex xs4 sm2 md1>
              <v-avatar
                size="36px"
              >
                <img
                  v-if="message.avatar"
                  src="/img/p1.png"
                  alt="Avatar"
                >                
                 <img
                   v-else
                  src="/img/p2.png"
                  alt="Avatar"
                >
                 <img
                   v-else
                  src="/img/p3.png"
                  alt="Avatar"
                >
                 <img
                   v-else
                  src="/img/p4.png"
                  alt="Avatar"
                >
              </v-avatar>
              
            </v-flex>          
          

            <v-flex no-wrap xs5 sm3>
              <v-chip
                v-if="message.new"
                :color="`${message.color} lighten-4`"
                class="ml-0"
                label
                small
              >
                {{ message.new }} new
              </v-chip>
              <strong v-html="message.title"></strong>
            </v-flex>

            <v-flex
              v-if="message.excerpt"
              class="grey--text"
              ellipsis
              hidden-sm-and-down
            >
              &mdash;
              {{ message.excerpt }}
            </v-flex>
          </v-layout>
        </template>

        <v-card>
          <v-divider></v-divider>
          <v-card-text v-text="lorem"></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>
<script>
  export default {
    layout: "public",
    data: () => ({
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'Alongkron Phukongka',
          title: 'อาจารย์อลงกรณ์  ภูคงคา',
          excerpt: 'CTC'
        },
        {      
                 
          total: 3,
          title: 'อาจารย์'
        },
        {        
          total: 4,
          title: 'อาจารย์',
        },
         {        
          total: 5,
          title: 'อาจารย์',
        }
      ],
      lorem: 'ตำแหน่งครู วิทยฐานะชำนาญการพิเศษ วิทยาลัยเทคนิคชัยภูมิ'
    })
  }
</script>