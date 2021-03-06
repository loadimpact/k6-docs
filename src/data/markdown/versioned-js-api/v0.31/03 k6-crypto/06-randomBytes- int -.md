---
title: 'randomBytes( int )'
description: 'randomBytes.'
excerpt: 'randomBytes.'
---

Return an array with a number of cryptographically random bytes. It will either return exactly the amount of bytes requested or will throw an exception if something went wrong.

| Parameter | Type    | Description                       |
| --------- | ------- | --------------------------------- |
| int       | integer | The length of the returned array. |

### Returns

| Type  | Description                                   |
| ----- | --------------------------------------------- |
| Array | An array with cryptographically random bytes. |

### Example

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';

export default function () {
  const bytes = crypto.randomBytes(42);
  console.log(bytes);
}
```

</CodeGroup>
