// import { GetServerSideProps } from 'next'
// import { getSession } from 'next-auth/react'
// import Head from 'next/head'
// import React, { FC } from 'react'

// const EditItem: FC<{ listing: Listing; categories: Category[] }> = ({ listing, categories }) => {
//   return (
//     <>
//       <Head>
//         <title>Ajjerni | Add Item</title>
//       </Head>
//       <div className="grid items-center h-full grid-cols-1 justify-items-center">
//         <div className="w-full">
//           <div className="add_item_wrap mb-8 px-8" id="add_item_wrap">
//             <ItemForm item={listing} categories={categories} />
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export const getServerSideProps: GetServerSideProps = withLayout(async (context) => {
//   const session = await getSession(context)
//   const { uuid } = context.params ?? {}
//   const { slug } = await parseCountryLanguage(context.params ?? {})
//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/${slug}/auth/signin?redirectTo=/${slug}/item/${uuid}/edit`,
//       },
//     }
//   }

//   const categories = await new CategoryApi(session).find({
//     parent_null: true,
//     _locale: 'en',
//     _limit: -1,
//   })

//   const listing = (
//     await new ListingApi(session).find({
//       uuid,
//       populate: ['owner', 'categories', 'images', 'address', 'address.country'],
//     })
//   )?.[0]

//   if (!listing) {
//     return {
//       notFound: true,
//     }
//   }

//   listing.address = await new AddressApi().findOne(listing?.address?.id ?? '')

//   if (listing.owner?.id !== session.id) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       listing,
//       categories,
//     },
//   }
// })

// export default EditItem
