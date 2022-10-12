---
title: NextJS TIL (updated regularly)
description: This is a collection of TILs for NextJS
date: '2022-08-23'
modified_date: '2022-08-23'
image: /assets/images/posts/nextjs.png
tags: 'react, nextjs'
---

![What's Next?](/assets/images/posts/nextjs.png)

This is a collection of TILs for NextJS, a pretty awesome React Framework. You can read about it [here](https://nextjs.org/).

-------
## 8/23/2022

I was using this to manage page navigation changes on danielsabbagh.com: 

```typescript
const [isLoading, setIsLoading] =  useState(false); 
```

Well, because NextJS is so great at [client-side routing](https://nextjs.org/docs/api-reference/next/router#router-object), I can key off of the router's `asPath` to manage page changes:

```typescript
const dynamicRoute = useRouter().asPath;

...
 // clear related posts when loading new blog post
useEffect(() => {
  setRelatedPosts([]);
  setShowRelatedPosts(false);
  setPostLikes(0);
  setTag('');
}, [dynamicRoute]);
```

With this, I blew away the `isLoading` silliness!