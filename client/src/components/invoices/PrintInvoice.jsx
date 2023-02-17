import React, {useRef} from 'react';
import {Button, Modal} from "antd";
import {useReactToPrint} from "react-to-print";

const PrintInvoice = ({invoicesDetail,isModalOpen,setIsModalOpen}) => {

   const ref = useRef();
   const handlePrint = useReactToPrint({  //print için yazdık.
      content: () => ref.current
   })

   return (
      <Modal title="Print Invoice" footer={false} open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={800}>
         <section className={"py-20 bg-black"} ref={ref}>
            <div className={"max-w-5xl mx-auto px-6 bg-white"}>
               <article className={"overflow-hidden"}>  {/*scroll bar gösterme*/}
                  <div className={"logo my-6"}>
                     <h2 className={"text-4xl font-bold"}>YSK</h2>
                  </div>
                  <div className={"invoice-details"}>
                     <div className={"grid sm:grid-cols-4 grid-cols-3 gap-12"}>
                        <div className={"text-md"}>
                           <p className={"font-bold"}>Customer Detail</p>
                           <p>{invoicesDetail?.customerName.toUpperCase()}</p>
                           <p>{invoicesDetail?.customerPhoneNumber}</p>
                           <p>Turkey</p>
                        </div>
                        <div className={"text-md"}>
                           <p className={"font-bold"}>Invoice</p>
                           <p>YSK Company</p>
                           <p>Yildiz Apt.</p>
                           <p>34050 Istanbul</p>
                        </div>
                        <div className={"text-md"}>
                           <div>
                              <p className={"font-bold"}>Invoice No</p>
                              <p>{invoicesDetail?._id.substring(10,18)}</p>
                           </div>
                           <div>
                              <p className={"font-bold"}>Date of Issue</p>
                              <p>{invoicesDetail?.createdAt?.substring(0,10)}</p>
                           </div>
                        </div>
                        <div className={"text-md sm:block hidden"}>
                           <div>
                              <p className={"font-bold"}>Terms</p>
                              <p>30 days</p>
                           </div>
                           <div>
                              <p className={"font-bold mt-2 a"}>Due</p>
                              <p>10.12.2023</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={"invoice-table mt-8"}>
                     <table className={"min-w-full divide-y overflow-hidden"}>
                        <thead>
                           <tr className={"border-b"}>
                              <th scope={"col"} className={"text-left py-3.5  text-sm font-normal sm:pl-6 md:pl-0 sm:table-cell hidden"}>Image</th>
                              <th scope={"col"} className={"text-left py-3.5 text-sm font-normal sm:pl-6 md:pl-0 sm:table-cell hidden"}>Title</th>
                              <th scope={"col"} colSpan={4} className={"text-left py-3.5 text-sm font-normal sm:pl-6 md:pl-0 sm:table-cell sm:hidden"}>Title</th>
                              <th scope={"col"} className={"text-center py-3.5 text-sm font-normal sm:pl-6 md:pl-0 sm:table-cell hidden"}>Price</th>
                              <th scope={"col"} className={"text-center py-3.5 text-sm font-normal sm:pl-6 md:pl-0 sm:table-cell hidden"}>Quantity</th>
                              <th scope={"col"} className={"text-end py-3.5 text-sm font-normal sm:pl-6 md:pl-0 sm:table-cell"}>Total</th>
                           </tr>
                        </thead>
                        <tbody>
                           {invoicesDetail?.cartItems?.map((cartItem) => (
                               <tr className="border-b">
                                  <td className="py-4 sm:table-cell hidden">
                                     <img
                                         src={cartItem.img}
                                         alt={cartItem.title}
                                         className="w-12 h-12 object-cover"
                                     />
                                  </td>
                                  <td className="py-4 sm:table-cell hidden"> {/*küçük ekranda gözükmez*/}
                                     <div className={"flex flex-col"}>
                                        <span className="font-medium">{cartItem.title}</span>      {/*sm: demek sm sonrası cihazlar demek*/}
                                        <span className="font-medium text-xs sm:hidden inline-block">1 unit {cartItem.price}$</span>
                                     </div>
                                  </td>
                                  <td className="py-4 sm:hidden" colSpan={4}>
                                     <div className={"flex flex-col"}>
                                        <span className="font-medium">{cartItem.title}</span>      {/*sm: demek sm sonrası cihazlar demek*/}
                                        <span className="font-medium text-xs sm:hidden inline-block">1 unit {cartItem.price}$</span>
                                     </div>
                                  </td>
                                  <td className="py-4 text-center sm:table-cell hidden">
                                     <span>{cartItem.price}$</span>
                                  </td>
                                  <td className="py-4 text-center sm:table-cell hidden">
                                     <span>{cartItem.quantity}</span>
                                  </td>
                                  <td className="py-4 text-center text-right text-end">
                                     <span>{cartItem.price*cartItem.quantity}$</span>
                                  </td>
                               </tr>
                           ))}
                        </tbody>
                        <tfoot>
                        <tr>
                           <th className="text-right pt-6" colSpan="4" scope="row">
                      <span className="font-normal">
                        Sub Total
                      </span>
                           </th>
                           <th className="text-right pt-4" colSpan="4" scope="row">
                              <span className="font-normal">{invoicesDetail?.subTotal}$</span>
                           </th>
                        </tr>
                        <tr>
                           <th className="text-right pt-4" colSpan={4} scope="row">
                              <span className="font-normal">Tax</span>
                           </th>
                           <th className="text-right pt-4" scope="row">
                              <span className="font-norma">+{invoicesDetail?.tax}$</span>
                           </th>
                        </tr>
                        <tr>
                           <th className="text-right pt-4 md:pl-0" colSpan={4}  scope="row">
                              <span className="font-normal">Total</span>
                           </th>
                           <th className="text-right pt-4" scope="row">
                              <span className="font-normal ">{invoicesDetail?.totalAmount}$</span>
                           </th>
                        </tr>
                        </tfoot>
                     </table>
                     <div className="py-9">
                        <div className="border-t pt-9">
                           <p className="text-sm font-light ">
                              If a bill has passed in both the U.S. House of Representatives and the U.S. Senate and has been approved by the President, or if a presidential veto has been overridden, the bill becomes a law and is enforced by the government.
                           </p>
                        </div>
                     </div>
                  </div>
               </article>
            </div>
         </section>
         <div className={"flex justify-end mt-4"}>
            <Button onClick={handlePrint} size={"large"} type={"primary"}>Print</Button>
         </div>
      </Modal>
   );
};

export default PrintInvoice;
