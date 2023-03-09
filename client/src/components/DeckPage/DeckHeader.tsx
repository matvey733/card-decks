import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IErrState } from "../../pages/ErrPage";
import BtnWithTooltip from "../BtnWithTooltip";
import { BsTrash3 as TrashIcon } from "react-icons/bs";
import Dialog from "../Dialog";
import axios from "axios";

interface IDeckHeaderProps {
  name: string
}

const DeckHeader: FC<IDeckHeaderProps> = ({ name }) => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogActive, setIsDeleteDialogActive] = useState(false);
  const [err, setErr] = useState<IErrState>({ occurred: false });
  if (err.occurred) throw new Error(err.msg);

  return (
    <header className="deck-header">

      <h1 className="deck-name">{name}</h1>
      <div className="deck-actions">
        <BtnWithTooltip tooltipText="Delete" onClick={openDeleteDialog}>
          <TrashIcon />
        </BtnWithTooltip>
      </div>
      <Dialog
        isActive={isDeleteDialogActive}
        title="This deck will be permanently deleted"
        primaryButton="Cancel"
        secondaryButton="Delete"
        onPrimaryButtonClick={closeDeleteDialog}
        onSecondaryButtonClick={deleteDeck}
        isSecondaryButtonDangerous={true}
      />
    </header>
  )

  async function deleteDeck() {
    try {
      await axios.delete(`decks/${deckId}`);
      navigate("/decks");
    } catch (err) {
      setErr({ occurred: true, msg: "Could not delete deck" });
    }
  }

  function openDeleteDialog() {
    setIsDeleteDialogActive(true);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogActive(false);
  }
}

export default DeckHeader;