<template>
  <div id="reviews">
    <h3 class="review-header">{{reviews ? reviews.length : 0}} reviews</h3>
    <div v-for="review in reviews" :key="review.id" class="review">
      <div class="review-summary">
        <div class="user-photo">
          <img :src="review.user.photo" />
        </div>
        <div class="review-details">
          <div>{{review.user.name}}</div>
          <div>rated it {{review.rating}} on {{review.date}}</div>
        </div>
      </div>
      <p class="review-content">
        {{review.content}}
      </p>
    </div>
    <div class="review-form">
      <h3>Your review</h3>
      <textarea></textarea>
      <div class="review-form-footer">
        <span>
          Rating:
          <select>
            <option value="">-- Select --</option>
            <option value="5">Awesome</option>
            <option value="4">Great</option>
            <option value="3">Good</option>
            <option value="2">Bad</option>
            <option value="1">Awful</option>
          </select>
        </span>
        <button>Submit review</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "ReviewList" })
export default class ReviewList extends Vue {

  @Prop()
  public reviews!: any[];

}
</script>

<style lang="scss">
#reviews {
  & > .review-header {
    border-bottom: 1px solid black;
    text-align: left;
  }

  & > .review-summary {
    display: flex;

    & > .user-photo {
      flex: 0 0 auto;
      margin-right: 20px;
    }

    & > .review-details {
      flex: 1 1 auto;
    }
  }

  & > .review-content {

  }

  & > .review-form {
    margin-bottom: 40px;

    & > h3 {
      text-align: left;
      margin-bottom: 0;
    }

    & > textarea {
      display: block;
      min-height: 10em;
      width: 100%;
    }

    & > .review-form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > button {
        padding: 10px 20px;
        margin: 10px 0;
      }
    }
  }
}
</style>
