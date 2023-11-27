import Head from "next/head"
import "@/styles/globals.css"
import Nav from "@/components/Nav"
import Provider from "@/components/Provider"

export const metadata = {
  title: "ShareHub",
  description: "Best place to get Answers"
}

const RootLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <html lang="en">
        <body>
          <Provider>
            <main className="app">
              <Nav />
              {children}
            </main>
          </Provider>
        </body>
      </html>
    </>
  )
}

export default RootLayout