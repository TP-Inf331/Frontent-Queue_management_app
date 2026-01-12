# Testing Client Registration - Quick Guide

## 🧪 Manual Test Steps

### 1. Open the Registration Page
Navigate to: `http://localhost:4001/auth/register`

### 2. Fill the Form
- **Nom complet**: Jean Dupont
- **Email**: jean.dupont@test.com
- **Password**: Test123!
- **Service**: Select any active queue from dropdown

### 3. Submit and Observe
Click "Créer mon compte et obtenir mon ticket"

### Expected Behavior:
1. ✅ Loading spinner appears
2. ✅ POST request to `/clients/` endpoint (check Network tab)
3. ✅ Success screen appears with:
   - Welcome message: "Bienvenue Jean Dupont!"
   - Ticket number (e.g., A001)
   - Queue name
   - Email confirmation
4. ✅ After 3 seconds, redirects to `/dashboard`
5. ✅ Dashboard shows:
   - User's active ticket(s)
   - Position in queue
   - Estimated wait time

### 4. Verify on Dashboard
- Check that the ticket appears
- Verify real-time position updates
- Ensure no errors in console

## 🔍 Debugging

If registration fails, check:

### Browser Console
Look for errors related to:
- Network requests (404, 500, etc.)
- CORS issues
- Authentication failures

### Network Tab
Verify:
```
POST /clients/
Request Payload:
{
  "email": "jean.dupont@test.com",
  "mot_de_passe": "Test123!",
  "nom": "Jean Dupont"
}

Expected Response (200):
{
  "user_id": 123,
  "email": "jean.dupont@test.com",
  "nom": "Jean Dupont",
  "role": "client",
  ...
}
```

### Backend Endpoint Check
Test the endpoint directly:
```bash
curl -X POST http://localhost:8000/clients/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "mot_de_passe": "password123",
    "nom": "Test User"
  }'
```

## Common Issues

### Issue 1: 404 Not Found on `/clients/`
**Solution**: Backend doesn't have `/clients/` endpoint. You may need to:
- Add the endpoint to your backend
- Or update `clientService` to use `/users/` with proper client flag

### Issue 2: Login fails after registration
**Cause**: Backend expects username but we're sending email
**Solution**: Update login to use the username returned from registration:
```typescript
const loginData = await authService.login(user.username, password);
```

### Issue 3: Ticket not created
**Check**: If backend automatically creates ticket during client registration, remove the `ticketService.joinQueue()` call

### Issue 4: No redirect to dashboard
**Check**: Console for JavaScript errors during success callback
