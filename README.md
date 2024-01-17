# About

Non-styled salsa remix.

Integration placeholder app with Strapi as CMS and Remix as WEB.

# Functions

- ✅ Login.
- ✅ Logout.
- ✅ Session context handler.
- ✅ Register.
- ✅ Recovery password.
- ✅ Protected resources.

# Configuration

## Strapi User Collection

### Configured permissions to Authenticated and Public Users.

User collection:

Settings -> User & Permissions Plugin -> Roles -> Public -> Users-permissions.

User section:

- Count
- find
- findOne

Settings -> User & Permissions Plugin -> Roles -> Authenticated -> Users-permissions.

Authenticated Role:

- Auth section: Select all
- Permissions section: Select all
- User section: Select all

### Create some users.

Content manager -> User -> Create new entry.

### Configure mail plugin

Nodemailer provider is set, to change it you should update the `./cms/config/plugins.js`.

If you want to use nodemailer as a provider, you'd have to generate a valid password, to do it you can follow [these steps](https://stackoverflow.com/a/72477193/9538308).

### Confirm public auth resetPassword and forgotPassword

Go to Settings -> Users & Permissions Plugin -> Roles -> Public -> Users-permissions.

Under the Auth section: confirm if you have `resetPassword` and `forgotPassword` enabled.

### References

Articles that I've been reading to solve doubts.

- [Strapi v4 Authentication with Remix](https://strapi.io/blog/strapi-v4-authentication-with-remix)
- [Users & Permissions plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions#authentication)
- [Examples cookbook: Authentication flow with JWT](https://docs.strapi.io/dev-docs/backend-customization/examples/authentication)
