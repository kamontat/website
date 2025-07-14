## Endpoints

| Input               | Type     | Output              |
| ------------------- | -------- | ------------------- |
| kc.in.th            | Redirect | kc.in.th/en         |
| kc.in.th/\*         | Redirect | kc.in.th/en/\*      |
| kc.in.th/th         | Same     | kc.in.th/th         |
| kc.in.th/th/\*      | Same     | kc.in.th/th/\*      |
| kc.in.th/blog/\*    | Redirect | blog.kc.in.th/en/\* |
| kc.in.th/blog/th/\* | Redirect | blog.kc.in.th/th/\* |
| blog.kc.in.th/\*    | Rewrite  | kc.in.th/blog/en/\* |
