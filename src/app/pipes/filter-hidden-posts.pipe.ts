import { Pipe, PipeTransform } from '@angular/core';
import { UserPosts } from '../models/user-posts';

@Pipe({
  name: 'filterHiddenPosts'
})
export class FilterHiddenPostsPipe implements PipeTransform {

  transform(posts: UserPosts[], hiddenPostsId: string[]):UserPosts[] {
   
    if (!posts || !hiddenPostsId) return posts;
    return posts.filter(post => !hiddenPostsId.includes(post.id));
  }

}
