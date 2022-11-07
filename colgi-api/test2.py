import nltk

# nltk.download('punkt')

sent1 = "a dog eating a cake."
sent1 = sent1.replace(".", "")

tokens = nltk.word_tokenize(sent1)
print(nltk.pos_tag(tokens))
