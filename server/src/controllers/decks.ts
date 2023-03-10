import { Request, Response } from "express";
import Deck from "../models/Deck";
import { BadRequestErr, NotFoundErr } from "../utils/errs";

export async function getDecks(req: Request, res: Response) {
  const decks = await Deck.find({});
  res.status(200).json(decks);
}

export async function getDeckById(req: Request, res: Response) {
  const { deckId } = req.params;
  if (deckId.length !== 24) {
    throw new BadRequestErr("ID must be 24 characters long");
  }
  const result = await Deck.findById(deckId);
  if (!result) throw new NotFoundErr("Deck not found");
  res.status(200).json(result);
}

export async function postDeck(req: Request, res: Response) {
  const deck = await Deck.create(req.body);
  res.status(200).json(deck);
}

export async function patchDeck(req: Request, res: Response) {
  const { deckId } = req.params;

  const updatedDeck = await Deck.findOneAndUpdate(
    { _id: deckId }, req.body, { new: true, runValidators: true }
  )

  if (!updatedDeck) throw new NotFoundErr("deck not found");
  res.json(updatedDeck);
}

export async function deleteDeck(req: Request, res: Response) {
  const { deckId } = req.params;
  const result = await Deck.deleteOne({ _id: deckId });

  if (result.deletedCount === 0) {
    throw new NotFoundErr("deck not found");
  }
  
  res.status(204).end();
}
