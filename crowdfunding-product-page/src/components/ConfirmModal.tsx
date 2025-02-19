





export const ConfirmModal = ({isConfirm, closeModal}:any) => {

    const handleBackdropClick = (e : React.MouseEvent<HTMLDivElement>) => {
        closeModal();  
    }
    return (
        <div className={`modal ${isConfirm ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <section className="modal-card-body">
                    <div className="has-text-centered">
                        <div className="has-text-weight-bold is-size-4 my-4">Thanks for your support!</div>
                        <div className="content mx-4 px-4">
                            <p className="has-text-grey">
                                Your pledge brings us one step closer to sharing 
                                Mastercraft Bamboo Monitor Riser worldwide.
                                You will get an email once our campaign is completed.
                            </p>
                        </div>
                    </div>
                    <div className="has-text-centered pt-4 mt-3">
                        <button className="button is-size-5" aria-label="close"  onClick={(e:any)=> handleBackdropClick(e)}>
                            Got it
                        </button> 
                    </div>
                </section>
            </div>    
        </div>
    )
};