import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { LockOutlined, CreditCard as CreditCardIcon, CardGiftcard as CardGiftcardIcon, Check as CheckIcon } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { API_END_POINT } from '../utils/constant';
import { setSubscription } from '../redux/userSlice';

const plans = [
  { tier: 'basic', price: '399', features: ['SD streaming', '1 device'] },
  { tier: 'standard', price: '699', features: ['HD streaming', '2 devices'] },
  { tier: 'premium', price: '999', features: ['4K streaming', '4 devices'] },
];

const SubscriptionModal = ({ open, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [step, setStep] = React.useState('plans'); // 'plans' | 'method' | 'payment'
  const [selectedTier, setSelectedTier] = React.useState('');
  const [selectedMethod, setSelectedMethod] = React.useState(''); // 'card' | 'gift'
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [processing, setProcessing] = React.useState(false);

  const handleSelectPlan = (tier) => {
    setSelectedTier(tier);
    setStep('method');
  };

  const resetAndClose = () => {
    setStep('plans');
    setSelectedTier('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setFirstName('');
    setLastName('');
    setSelectedMethod('');
    setProcessing(false);
    onClose();
  };

  const handlePay = async () => {
    if (!cardNumber || !expiry || !cvv) return;
    setProcessing(true);
    setTimeout(async () => {
      toast.success('Payment Successful');
      try {
        const res = await axios.post(`${API_END_POINT}/subscribe`, { tier: selectedTier }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        if (res.data?.success) {
          const updated = res.data.user;
          dispatch(setSubscription({
            isSubscribed: !!updated.isSubscribed,
            subscriptionTier: updated.subscriptionTier || 'none',
          }));
          resetAndClose();
          if (onSuccess) onSuccess();
        }
      } catch (e) {
        setProcessing(false);
      }
    }, 3000);
  };

  const canPay = !!firstName && !!lastName && !!cardNumber && !!expiry && !!cvv && !processing;

  const stepIndex = step === 'plans' ? 1 : step === 'method' ? 2 : 3; // processing is transient

  return (
    <Dialog 
      open={open} 
      onClose={resetAndClose} 
      maxWidth="sm" 
      fullWidth
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.6)' } } }}
      PaperProps={{
        sx: {
          background: 'linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(10,10,10,1) 100%)',
          color: '#fff',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          width: 520,
          maxWidth: '520px'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1.5, pt: 2.5 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <LockOutlined fontSize="small" />
            <Typography variant="caption" sx={{ opacity: 0.85, letterSpacing: .4 }}>{`STEP ${stepIndex} OF 4`}</Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center' }}>
            End-to-end encryption <LockOutlined fontSize="inherit" sx={{ ml: .5 }}/>
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 1, fontWeight: 900, letterSpacing: .2 }}>
          {step === 'plans' && 'Choose a plan to continue'}
          {step === 'method' && 'Choose how to pay'}
          {step === 'payment' && 'Set up your credit or debit card'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 0, pb: 0 }}>
        {step === 'plans' && (
          <Grid container spacing={2} sx={{ mt: .5, mb: 2 }}>
            {plans.map((p) => (
              <Grid item xs={12} key={p.tier}>
                <Card 
                  onClick={() => handleSelectPlan(p.tier)}
                  style={{ cursor: 'pointer' }}
                  sx={{
                    background: 'linear-gradient(180deg, rgba(32,32,32,0.95) 0%, rgba(18,18,18,0.95) 100%)',
                    color: '#fff',
                    border: selectedTier === p.tier ? '2px solid #e50914' : '1px solid rgba(255,255,255,0.12)',
                    transform: selectedTier === p.tier ? 'translateY(-4px)' : 'none',
                    transition: 'all 220ms ease',
                    '&:hover': { boxShadow: 10, transform: 'translateY(-4px)' }
                  }}
                >
                  <CardContent sx={{ p: 2.25, color: '#fff' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', opacity: 0.9, letterSpacing: 1, color: '#fff' }}>
                        {p.tier}
                      </Typography>
                      {p.tier === 'standard' && (
                        <Chip size="small" label="Most popular" sx={{ bgcolor: '#e50914', color: '#fff', height: 20 }} />
                      )}
                    </Box>
                    <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
                      {p.price}
                      <Typography component="span" variant="subtitle2" sx={{ opacity: 0.8 }}>/ month</Typography>
                    </Typography>
                    <Stack spacing={1} sx={{ my: 1.5 }}>
                      {p.features.map((f) => (
                        <Box key={f} display="flex" alignItems="center" gap={1}>
                          <CheckIcon fontSize="small" sx={{ color: '#46d369' }}/>
                          <Typography variant="body2" sx={{ opacity: 0.95, color: '#fff' }}>{f}</Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Button 
                      variant="contained" 
                      color="error" 
                      fullWidth
                      sx={{ mt: 1, textTransform: 'none', fontWeight: 700, borderRadius: 2, py: 1.1 }}
                      onClick={() => handleSelectPlan(p.tier)}
                    >
                      Choose {p.tier}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {step === 'method' && (
          <Box display="flex" flexDirection="column" gap={2} sx={{ mb: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Your payment is secure and you can change your payment method any time.
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card 
                  onClick={() => { setSelectedMethod('card'); setStep('payment'); }} 
                  style={{ cursor: 'pointer' }}
                  sx={{
                    background: 'linear-gradient(180deg, rgba(30,30,30,0.95) 0%, rgba(22,22,22,0.95) 100%)',
                    border: selectedMethod === 'card' ? '2px solid #e50914' : '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  <CardContent sx={{ p: 2.25, color: '#fff' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <CreditCardIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>Credit/debit card</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#fff' }}>›</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip size="small" label="VISA" sx={{ bgcolor: '#1a1f71', color: '#fff', fontWeight: 700 }} />
                      <Chip size="small" label="Mastercard" sx={{ bgcolor: '#eb001b', color: '#fff', fontWeight: 700 }} />
                      <Chip size="small" label="AMEX" sx={{ bgcolor: '#2e77bb', color: '#fff', fontWeight: 700 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card 
                  onClick={() => { setSelectedMethod('gift'); }} 
                  style={{ cursor: 'not-allowed', opacity: 0.6 }}
                  sx={{ background: 'linear-gradient(180deg, rgba(30,30,30,0.95) 0%, rgba(22,22,22,0.95) 100%)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <CardContent sx={{ p: 2.25, color: '#fff' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={1}>
                        <CardGiftcardIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>Gift card</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#fff' }}>›</Typography>
                    </Box>
                    <Typography variant="caption">Not available in this demo</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {step === 'payment' && (
          <Box display="flex" flexDirection="column" gap={2} sx={{ mb: 2 }}>
            <Typography>Selected plan: <strong style={{ textTransform: 'capitalize' }}>{selectedTier}</strong></Typography>
            <Stack direction="row" spacing={1}>
              <Chip size="small" label="VISA" sx={{ bgcolor: '#1a1f71', color: '#fff', fontWeight: 700 }} />
              <Chip size="small" label="Mastercard" sx={{ bgcolor: '#eb001b', color: '#fff', fontWeight: 700 }} />
              <Chip size="small" label="AMEX" sx={{ bgcolor: '#2e77bb', color: '#fff', fontWeight: 700 }} />
            </Stack>
            <Box display="flex" gap={2}>
              <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#fff' }
                }}
              />
              <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#fff' }
                }}
              />
            </Box>
            <TextField label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} fullWidth 
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, color: '#fff' },
                '& .MuiInputLabel-root': { color: '#fff' }
              }}
            />
            <Box display="flex" gap={2}>
              <TextField label="Expiry (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} fullWidth 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#fff' }
                }}
              />
              <TextField label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} fullWidth 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, color: '#fff' },
                  '& .MuiInputLabel-root': { color: '#fff' }
                }}
              />
            </Box>
          </Box>
        )}

        {processing && (
          <Box mt={3} display="flex" justifyContent="center" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography>Processing payment…</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{
        px: 3,
        py: 2,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(10,10,10,1)',
        position: 'sticky',
        bottom: 0
      }}>
        {step === 'plans' && (
          <Button onClick={resetAndClose} variant="outlined" color="inherit" sx={{ textTransform: 'uppercase' }}>Cancel</Button>
        )}
        {step === 'method' && (
          <>
            <Button onClick={() => setStep('plans')} variant="outlined" color="inherit" sx={{ textTransform: 'uppercase', borderRadius: 2 }}>Back</Button>
            <Button 
              onClick={() => setStep('payment')} 
              disabled={selectedMethod !== 'card'}
              variant="contained" 
              color="error" 
              sx={{ textTransform: 'uppercase', borderRadius: 2, fontWeight: 800 }}
            >
              Next
            </Button>
          </>
        )}
        {step === 'payment' && (
          <>
            <Button onClick={() => setStep('method')} disabled={processing} variant="outlined" color="inherit" sx={{ textTransform: 'uppercase', borderRadius: 2 }}>Back</Button>
            <Button variant="contained" color="error" onClick={handlePay} disabled={!canPay} sx={{ textTransform: 'uppercase', borderRadius: 2, fontWeight: 800, px: 3 }}>Pay</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionModal;


