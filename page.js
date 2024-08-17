'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid, Link } from "@mui/material";
import Head from 'next/head'

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000' //CHANGE THIS BEFORE DEPLOYMENT -------------------------------------------------------[[]]
      }
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>ai-flashcards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
        <Toolbar position="static">
        <Typography style={{flexGrow:1, fontSize: "24px"}}><Link href="#" underline="none" sx={{color:"#333333"}}>SmartCram</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="#" underline="none" sx={{color:"#333333"}}>Product</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="#" underline="none" sx={{color:"#333333"}}>Pricing</Link></Typography>
        <Typography style={{flexGrow:1, fontSize: "18px"}}><Link href="/flashcards" underline="none" sx={{color:"#333333"}}>Dashboard</Link></Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>

      <Box
      sx={{
        textAlign:'center',
        my:4
      }}>
        <Typography variant="h2" gutterBottom>Welcome to SmartCram!</Typography>
        <Typography variant="h5" gutterBottom>The easiest way to make flashcards from scratch</Typography>
        <Button variant="contained" color="primary" sx={{mt:2}} href="/generate">Get Started</Button>
      </Box>
      
      <Box sx={{my:6}}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart flashcards</Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my:6, textAlign:'center'}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              padding:3,
              border: "1px solid grey",
              borderRadius: 2
            }}>
            <Typography variant="h5" gutterBottom>Basic</Typography>
            <Typography variant="h6" gutterBottom>Free</Typography>
            <Typography>
              {' '}
              Access to basic flashcards features and limited storage
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}}>
              Choose Basic
            </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              padding:3,
              border: "1px solid grey",
              borderRadius: 2
            }}>
            <Typography variant="h5" gutterBottom>Pro</Typography>
            <Typography variant="h6" gutterBottom>$2 One-Time</Typography>
            <Typography>
              {' '}
              Unlimited flashcards and storage with priority support.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmit}>
              Choose Pro
            </Button>
            
            </Box>
          </Grid> 
        </Grid>
      </Box>

    </Container>
  )
}
